package com.example.stage2025.controller;

import com.example.stage2025.dto.UserDto;
import com.example.stage2025.enums.Role;
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
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userManagementService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userManagementService.updateUser(id, userDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userManagementService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // User status management
    @PutMapping("/{id}/suspend")
    public ResponseEntity<UserDto> suspendUser(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String reason = request.getOrDefault("reason", "No reason provided");
        return ResponseEntity.ok(userManagementService.suspendUser(id, reason));
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<UserDto> activateUser(@PathVariable Long id) {
        return ResponseEntity.ok(userManagementService.activateUser(id));
    }

    @PutMapping("/{id}/ban")
    public ResponseEntity<UserDto> banUser(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String reason = request.getOrDefault("reason", "No reason provided");
        return ResponseEntity.ok(userManagementService.banUser(id, reason));
    }

    @PutMapping("/{id}/unban")
    public ResponseEntity<UserDto> unbanUser(@PathVariable Long id) {
        return ResponseEntity.ok(userManagementService.unbanUser(id));
    }

    // Bulk operations
    @PutMapping("/bulk/suspend")
    public ResponseEntity<List<UserDto>> bulkSuspendUsers(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<Long> userIds = (List<Long>) request.get("userIds");
        String reason = (String) request.getOrDefault("reason", "No reason provided");
        return ResponseEntity.ok(userManagementService.bulkSuspendUsers(userIds, reason));
    }

    @PutMapping("/bulk/activate")
    public ResponseEntity<List<UserDto>> bulkActivateUsers(@RequestBody Map<String, List<Long>> request) {
        List<Long> userIds = request.get("userIds");
        return ResponseEntity.ok(userManagementService.bulkActivateUsers(userIds));
    }

    @DeleteMapping("/bulk")
    public ResponseEntity<Void> bulkDeleteUsers(@RequestBody Map<String, List<Long>> request) {
        List<Long> userIds = request.get("userIds");
        userManagementService.bulkDeleteUsers(userIds);
        return ResponseEntity.noContent().build();
    }

    // Role management
    @PutMapping("/{id}/role")
    public ResponseEntity<UserDto> changeUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Role newRole = Role.valueOf(request.get("role"));
        return ResponseEntity.ok(userManagementService.changeUserRole(id, newRole));
    }

    @GetMapping("/by-role/{role}")
    public ResponseEntity<List<UserDto>> getUsersByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userManagementService.getUsersByRole(role));
    }

    // Statistics and filtering
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> getUserStatistics() {
        return ResponseEntity.ok(userManagementService.getUserStatistics());
    }

    @GetMapping("/active")
    public ResponseEntity<List<UserDto>> getActiveUsers() {
        return ResponseEntity.ok(userManagementService.getActiveUsers());
    }

    @GetMapping("/suspended")
    public ResponseEntity<List<UserDto>> getSuspendedUsers() {
        return ResponseEntity.ok(userManagementService.getSuspendedUsers());
    }

    @GetMapping("/recent")
    public ResponseEntity<List<UserDto>> getRecentlyRegisteredUsers(@RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(userManagementService.getRecentlyRegisteredUsers(days));
    }

    // Password management
    @PostMapping("/{id}/reset-password")
    public ResponseEntity<Map<String, String>> resetUserPassword(@PathVariable Long id) {
        userManagementService.resetUserPassword(id);
        return ResponseEntity.ok(Map.of("message", "Password reset email sent to user"));
    }

    @PostMapping("/{id}/force-password-change")
    public ResponseEntity<Map<String, String>> forcePasswordChange(@PathVariable Long id) {
        userManagementService.forcePasswordChange(id);
        return ResponseEntity.ok(Map.of("message", "User will be prompted to change password on next login"));
    }

    // Search and filter
    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam String term) {
        return ResponseEntity.ok(userManagementService.searchUsers(term));
    }

    @PostMapping("/filter")
    public ResponseEntity<List<UserDto>> filterUsers(@RequestBody Map<String, Object> filters) {
        return ResponseEntity.ok(userManagementService.filterUsers(filters));
    }
}

