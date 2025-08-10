package com.example.stage2025.service;

import com.example.stage2025.dto.UserDto;
import com.example.stage2025.entity.User;
import com.example.stage2025.enums.Role;

import java.util.List;
import java.util.Map;

public interface UserManagementService {
    
    // User CRUD operations
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    
    // User status management
    UserDto suspendUser(Long id, String reason);
    UserDto activateUser(Long id);
    UserDto banUser(Long id, String reason);
    UserDto unbanUser(Long id);
    
    // Bulk operations
    List<UserDto> bulkSuspendUsers(List<Long> userIds, String reason);
    List<UserDto> bulkActivateUsers(List<Long> userIds);
    void bulkDeleteUsers(List<Long> userIds);
    
    // Role management
    UserDto changeUserRole(Long id, Role newRole);
    List<UserDto> getUsersByRole(Role role);
    
    // User statistics and filtering
    Map<String, Long> getUserStatistics();
    List<UserDto> getActiveUsers();
    List<UserDto> getSuspendedUsers();
    List<UserDto> getRecentlyRegisteredUsers(int days);
    
    // Password management
    void resetUserPassword(Long id);
    void forcePasswordChange(Long id);
    
    // Search and filter
    List<UserDto> searchUsers(String searchTerm);
    List<UserDto> filterUsers(Map<String, Object> filters);
}

