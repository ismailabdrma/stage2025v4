package com.example.stage2025.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResendOtpRequest {
    private String email;
    private String type;
}
