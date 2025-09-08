package com.example.stage2025.controller;

import com.example.stage2025.dto.*;
import com.example.stage2025.entity.User;
import com.example.stage2025.entity.Client;
import com.example.stage2025.enums.Role;
import com.example.stage2025.repository.UserRepository;
import com.example.stage2025.service.OtpService;
import com.example.stage2025.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final OtpService otpService;

    /** --- 1. Registration (send OTP) --- */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {
            System.out.println("🔍 Register request received: " + req);
            
            // Validate required fields
            if (req.getUsername() == null || req.getUsername().trim().isEmpty()) {
                System.out.println("🔍 Validation failed: Username is required");
                return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Username is required"));
            }
            if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
                System.out.println("🔍 Validation failed: Email is required");
                return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Email is required"));
            }
            if (req.getPassword() == null || req.getPassword().trim().isEmpty()) {
                System.out.println("🔍 Validation failed: Password is required");
                return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Password is required"));
            }
            
            if (userRepo.findByUsername(req.getUsername()).isPresent()) {
                System.out.println("🔍 Username already exists: " + req.getUsername());
                return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Username already exists"));
            }
            if (userRepo.findByEmail(req.getEmail()).isPresent()) {
                System.out.println("🔍 Email already exists: " + req.getEmail());
                return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Email already exists"));
            }

            System.out.println("🔍 Creating new user...");
            Client user = new Client();
            user.setUsername(req.getUsername());
            user.setEmail(req.getEmail());
            user.setPassword(encoder.encode(req.getPassword()));
            user.setRole(Role.CLIENT);
            user.setActive(false); // Not active until OTP verification
            
            // Set optional fields if provided and not empty
            if (req.getFirstName() != null && !req.getFirstName().trim().isEmpty()) {
                user.setFirstName(req.getFirstName().trim());
            }
            if (req.getLastName() != null && !req.getLastName().trim().isEmpty()) {
                user.setLastName(req.getLastName().trim());
            }
            if (req.getPhone() != null && !req.getPhone().trim().isEmpty()) {
                user.setPhone(req.getPhone().trim());
            }

            System.out.println("🔍 Saving user to database...");
            userRepo.save(user);
            System.out.println("🔍 User saved successfully with ID: " + user.getId());

            // Send OTP to email
            System.out.println("🔍 Sending OTP to email...");
            otpService.sendOtp(user.getEmail(), user.getId(), "REGISTRATION");
            System.out.println("🔍 OTP sent successfully");

            return ResponseEntity.ok(new ApiResponse("SUCCESS", "Registration successful! OTP sent to email."));
        } catch (Exception e) {
            System.out.println("🔍 Error during registration: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Registration failed: " + e.getMessage()));
        }
    }

    /** Alias for legacy/frontend endpoint: /signup -> /register */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterRequest req) {
        System.out.println("🔍 Received signup request: " + req);
        return register(req);
    }

    /** --- 2. Verify Registration OTP and activate account --- */
    @PostMapping("/verify-registration")
    public ResponseEntity<?> verifyRegistration(@RequestBody OtpVerifyRequest req) {
        Optional<User> userOpt = userRepo.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "User not found"));

        User user = userOpt.get();
        if (otpService.verifyOtp(user.getEmail(), "REGISTRATION", req.getOtp())) {
            user.setActive(true);
            userRepo.save(user);
            return ResponseEntity.ok(new ApiResponse("SUCCESS", "Account activated successfully!"));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Invalid or expired OTP."));
        }
    }

    /** Alias for legacy/frontend endpoint: /verify-email -> /verify-registration */
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody OtpVerifyRequest req) {
        return verifyRegistration(req);
    }

    /** --- 3. Login (admins get direct token, clients need OTP) --- */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword());
            authManager.authenticate(authToken);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("ERROR", "Invalid username or password"));
        }

        User user = userRepo.findByUsernameOrEmail(req.getUsername(), req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.isActive()) {
            return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Account not activated."));
        }

        // Admins skip OTP and get direct JWT token for better UX
        if (user.getRole() == Role.ADMIN) {
            String token = jwtUtils.generateToken(user);
            return ResponseEntity.ok(new JwtResponse(token, user.getId(), user.getUsername(), user.getEmail(), user.getRole().name()));
        } else {
            // Regular users still need OTP verification
            otpService.sendOtp(user.getEmail(), user.getId(), "LOGIN");
            return ResponseEntity.ok(new ApiResponse("OTP_REQUIRED", "OTP sent to your email. Please verify to complete login."));
        }
    }

    /** --- 4. Complete Login with OTP (return JWT) --- */
    @PostMapping("/login/verify-otp")
    public ResponseEntity<?> loginVerifyOtp(@RequestBody OtpVerifyRequest req) {
        Optional<User> userOpt = userRepo.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Invalid email"));

        User user = userOpt.get();
        if (otpService.verifyOtp(user.getEmail(), "LOGIN", req.getOtp())) {
            String token = jwtUtils.generateToken(user);
            return ResponseEntity.ok(new JwtResponse(token, user.getId(), user.getUsername(), user.getEmail(), user.getRole().name()));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Invalid or expired OTP."));
        }
    }

    /** --- 5. Resend OTP (for login or registration verification) --- */
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody ResendOtpRequest req) {
        Optional<User> userOpt = userRepo.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "User not found"));

        User user = userOpt.get();
        otpService.sendOtp(user.getEmail(), user.getId(), req.getType());
        return ResponseEntity.ok(new ApiResponse("SUCCESS", "OTP resent to email."));
    }

    /** --- 6. Forgot Password: request reset (send OTP) --- */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody EmailRequest req) {
        Optional<User> userOpt = userRepo.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "User not found"));

        User user = userOpt.get();
        otpService.sendOtp(user.getEmail(), user.getId(), "FORGOT");
        return ResponseEntity.ok(new ApiResponse("SUCCESS", "OTP sent for password reset."));
    }

    /** --- 7. Reset Password with OTP --- */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req) {
        Optional<User> userOpt = userRepo.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "User not found"));

        User user = userOpt.get();
        if (otpService.verifyOtp(user.getEmail(), "FORGOT", req.getOtp())) {
            user.setPassword(encoder.encode(req.getNewPassword()));
            userRepo.save(user);
            return ResponseEntity.ok(new ApiResponse("SUCCESS", "Password reset successful."));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Invalid or expired OTP."));
        }
    }
}