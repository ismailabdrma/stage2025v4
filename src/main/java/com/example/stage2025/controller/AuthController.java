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
        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Username already exists"));
        }
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse("ERROR", "Email already exists"));
        }

        Client user = new Client();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(Role.CLIENT);
        user.setActive(false); // Not active until OTP verification

        userRepo.save(user);

        // Send OTP to email
        otpService.sendOtp(user.getEmail(), user.getId(), "REGISTRATION");

        return ResponseEntity.ok(new ApiResponse("SUCCESS", "Registration successful! OTP sent to email."));
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