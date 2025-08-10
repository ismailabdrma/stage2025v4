package com.example.stage2025.service.impl;

import com.example.stage2025.dto.UserDto;
import com.example.stage2025.entity.User;
import com.example.stage2025.enums.Role;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.mapper.UserMapper;
import com.example.stage2025.repository.UserRepository;
import com.example.stage2025.service.UserManagementService;
import com.example.stage2025.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserManagementServiceImpl implements UserManagementService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        return UserMapper.toDto(user);
    }

    @Override
    @Transactional
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        // Update allowed fields
        if (userDto.getFirstName() != null) user.setFirstName(userDto.getFirstName());
        if (userDto.getLastName() != null) user.setLastName(userDto.getLastName());
        if (userDto.getEmail() != null) user.setEmail(userDto.getEmail());
        if (userDto.getPhone() != null) user.setPhone(userDto.getPhone());

        User saved = userRepository.save(user);
        log.info("User {} updated by admin", id);
        
        return UserMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        
        userRepository.delete(user);
        log.info("User {} deleted by admin", id);
    }

    @Override
    @Transactional
    public UserDto suspendUser(Long id, String reason) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        
        user.setActive(false);
        // Note: You might want to add a suspension reason field to the User entity
        User saved = userRepository.save(user);
        
        // Send notification email
        try {
            emailService.sendUserSuspensionNotification(user, reason);
        } catch (Exception e) {
            log.warn("Failed to send suspension notification to user {}: {}", id, e.getMessage());
        }
        
        log.info("User {} suspended by admin. Reason: {}", id, reason);
        return UserMapper.toDto(saved);
    }

    @Override
    @Transactional
    public UserDto activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        
        user.setActive(true);
        User saved = userRepository.save(user);
        
        // Send reactivation email
        try {
            emailService.sendUserReactivationNotification(user);
        } catch (Exception e) {
            log.warn("Failed to send reactivation notification to user {}: {}", id, e.getMessage());
        }
        
        log.info("User {} activated by admin", id);
        return UserMapper.toDto(saved);
    }

    @Override
    @Transactional
    public UserDto banUser(Long id, String reason) {
        // For now, same as suspend - you could add a banned status
        return suspendUser(id, reason);
    }

    @Override
    @Transactional
    public UserDto unbanUser(Long id) {
        return activateUser(id);
    }

    @Override
    @Transactional
    public List<UserDto> bulkSuspendUsers(List<Long> userIds, String reason) {
        List<User> users = userRepository.findAllById(userIds);
        
        for (User user : users) {
            user.setActive(false);
        }
        
        List<User> savedUsers = userRepository.saveAll(users);
        
        // Send notifications in background
        for (User user : users) {
            try {
                emailService.sendUserSuspensionNotification(user, reason);
            } catch (Exception e) {
                log.warn("Failed to send suspension notification to user {}: {}", user.getId(), e.getMessage());
            }
        }
        
        log.info("Bulk suspended {} users by admin. Reason: {}", userIds.size(), reason);
        
        return savedUsers.stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<UserDto> bulkActivateUsers(List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);
        
        for (User user : users) {
            user.setActive(true);
        }
        
        List<User> savedUsers = userRepository.saveAll(users);
        
        // Send notifications in background
        for (User user : users) {
            try {
                emailService.sendUserReactivationNotification(user);
            } catch (Exception e) {
                log.warn("Failed to send reactivation notification to user {}: {}", user.getId(), e.getMessage());
            }
        }
        
        log.info("Bulk activated {} users by admin", userIds.size());
        
        return savedUsers.stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void bulkDeleteUsers(List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);
        userRepository.deleteAll(users);
        
        log.info("Bulk deleted {} users by admin", userIds.size());
    }

    @Override
    @Transactional
    public UserDto changeUserRole(Long id, Role newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        
        Role oldRole = user.getRole();
        user.setRole(newRole);
        User saved = userRepository.save(user);
        
        // Send role change notification
        try {
            emailService.sendRoleChangeNotification(user, oldRole, newRole);
        } catch (Exception e) {
            log.warn("Failed to send role change notification to user {}: {}", id, e.getMessage());
        }
        
        log.info("User {} role changed from {} to {} by admin", id, oldRole, newRole);
        return UserMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getUsersByRole(Role role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == role)
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getUserStatistics() {
        List<User> allUsers = userRepository.findAll();
        
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", (long) allUsers.size());
        stats.put("active", allUsers.stream().filter(User::isActive).count());
        stats.put("suspended", allUsers.stream().filter(user -> !user.isActive()).count());
        stats.put("admins", allUsers.stream().filter(user -> user.getRole() == Role.ADMIN).count());
        stats.put("clients", allUsers.stream().filter(user -> user.getRole() == Role.CLIENT).count());
        
        // Recent registrations (last 30 days)
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        stats.put("recentRegistrations", userRepository.countByCreatedAtAfter(thirtyDaysAgo));
        
        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getActiveUsers() {
        return userRepository.findAll().stream()
                .filter(User::isActive)
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getSuspendedUsers() {
        return userRepository.findAll().stream()
                .filter(user -> !user.isActive())
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getRecentlyRegisteredUsers(int days) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(days);
        return userRepository.findAll().stream()
                .filter(user -> user.getCreatedAt() != null && user.getCreatedAt().isAfter(cutoffDate))
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void resetUserPassword(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        
        // Generate temporary password
        String tempPassword = generateTemporaryPassword();
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);
        
        // Send email with temporary password
        try {
            emailService.sendPasswordResetByAdmin(user, tempPassword);
        } catch (Exception e) {
            log.error("Failed to send password reset email to user {}: {}", id, e.getMessage());
            throw new RuntimeException("Failed to send password reset email");
        }
        
        log.info("Password reset for user {} by admin", id);
    }

    @Override
    @Transactional
    public void forcePasswordChange(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        
        // You could add a forcePasswordChange flag to the User entity
        // user.setForcePasswordChange(true);
        userRepository.save(user);
        
        try {
            emailService.sendForcePasswordChangeNotification(user);
        } catch (Exception e) {
            log.warn("Failed to send force password change notification to user {}: {}", id, e.getMessage());
        }
        
        log.info("Force password change for user {} by admin", id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> searchUsers(String searchTerm) {
        String term = searchTerm.toLowerCase();
        return userRepository.findAll().stream()
                .filter(user -> 
                    user.getUsername().toLowerCase().contains(term) ||
                    user.getEmail().toLowerCase().contains(term) ||
                    (user.getFirstName() != null && user.getFirstName().toLowerCase().contains(term)) ||
                    (user.getLastName() != null && user.getLastName().toLowerCase().contains(term))
                )
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> filterUsers(Map<String, Object> filters) {
        return userRepository.findAll().stream()
                .filter(user -> {
                    if (filters.containsKey("role")) {
                        Role role = Role.valueOf((String) filters.get("role"));
                        if (user.getRole() != role) return false;
                    }
                    if (filters.containsKey("active")) {
                        Boolean active = (Boolean) filters.get("active");
                        if (user.isActive() != active) return false;
                    }
                    if (filters.containsKey("registeredAfter")) {
                        LocalDateTime date = (LocalDateTime) filters.get("registeredAfter");
                        if (user.getCreatedAt() == null || user.getCreatedAt().isBefore(date)) return false;
                    }
                    return true;
                })
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    private String generateTemporaryPassword() {
        return "TempPass" + System.currentTimeMillis();
    }
}

