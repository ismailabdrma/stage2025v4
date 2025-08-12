package com.example.stage2025.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private String status;
    private String message;
    private Object data;
    
    public ApiResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
