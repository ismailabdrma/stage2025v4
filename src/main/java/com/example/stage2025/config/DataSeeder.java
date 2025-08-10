package com.example.stage2025.config;

import com.example.stage2025.entity.Admin;
import com.example.stage2025.entity.User;
import com.example.stage2025.repository.UserRepository;
import com.example.stage2025.enums.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@stage2025.com}")
    private String adminEmail;

    @Value("${app.admin.password:Admin123!@}")
    private String adminPassword;

    @Value("${app.admin.username:admin}")
    private String adminUsername;

    @Override
    public void run(String... args) throws Exception {
        createDefaultAdminIfNotExists();
    }

    private void createDefaultAdminIfNotExists() {
        // Check if any admin exists
        boolean adminExists = userRepository.existsByRole(Role.ADMIN);
        
        if (!adminExists) {
            try {
                Admin admin = new Admin(adminUsername, adminEmail, passwordEncoder.encode(adminPassword), Role.ADMIN);
                admin.setEmailVerified(true); // Admin doesn't need email verification
                admin.setActive(true);

                userRepository.save(admin);
                
                log.info("✅ Default admin created successfully:");
                log.info("   Email: {}", adminEmail);
                log.info("   Username: {}", adminUsername);
                log.info("   ⚠️  Please change the default password after first login!");
                
            } catch (Exception e) {
                log.error("❌ Failed to create default admin: {}", e.getMessage());
            }
        } else {
            log.info("ℹ️  Admin user already exists, skipping creation");
        }
    }
}