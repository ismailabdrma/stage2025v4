// src/main/java/com/example/stage2025/controller/ActivityLogController.java
package com.example.stage2025.controller;

import com.example.stage2025.dto.ActivityLogDto;
import com.example.stage2025.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/audit")
@RequiredArgsConstructor
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ActivityLogDto>> getAll() {
        return ResponseEntity.ok(activityLogService.getAllLogs());
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ActivityLogDto>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(activityLogService.getLogsByUserId(userId));
    }
}

