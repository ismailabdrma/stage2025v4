package com.example.stage2025.exception;

public class ConcurrentOrderException extends RuntimeException {
    public ConcurrentOrderException(String message) {
        super(message);
    }

    public ConcurrentOrderException(String message, Throwable cause) {
        super(message, cause);
    }
}