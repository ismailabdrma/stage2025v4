package com.example.stage2025.controller;

import com.example.stage2025.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        // TODO: Implement user listing
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable Long id) {
        // TODO: Implement user details
        return ResponseEntity.ok(Map.of("id", id, "status", "active"));
    }

    @PostMapping("/{id}/activate")
    public ResponseEntity<Map<String, String>> activateUser(@PathVariable Long id) {
        // TODO: Implement user activation
        return ResponseEntity.ok(Map.of("status", "activated"));
    }

    @PostMapping("/{id}/deactivate")
    public ResponseEntity<Map<String, String>> deactivateUser(@PathVariable Long id) {
        // TODO: Implement user deactivation
        return ResponseEntity.ok(Map.of("status", "deactivated"));
    }
}