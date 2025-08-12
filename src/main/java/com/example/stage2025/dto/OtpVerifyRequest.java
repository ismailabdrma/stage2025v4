package com.example.stage2025.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpVerifyRequest {
    private String email;
    private String otp;
}
