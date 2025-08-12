package com.example.stage2025.service;

import com.example.stage2025.dto.UserDto;
import java.util.List;

public interface UserManagementService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto activateUser(Long id);
    void deactivateUser(Long id);
}