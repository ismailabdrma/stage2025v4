package com.example.stage2025;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class Stage2025Application {

    public static void main(String[] args) {
        SpringApplication.run(Stage2025Application.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initializeApplication() {
        log.info("Initializing application...");
        // Only initialize shipping fees for now
        // adminService.initializeAdminUser(); // Removed - service doesn't exist
        // shippingFeeService.initializeDefaultShippingFees(); // Will be called when service is available
        log.info("Application initialization completed!");
    }
}
