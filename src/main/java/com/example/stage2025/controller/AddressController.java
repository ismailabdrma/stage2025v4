// src/main/java/com/example/stage2025/controller/AddressController.java
package com.example.stage2025.controller;

import com.example.stage2025.dto.AddressDto;
import com.example.stage2025.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    // Helper to get client ID from JWT filter attribute or fallback to auth name if numeric
    private Long resolveClientId(Authentication auth, Long userIdAttr) {
        if (userIdAttr != null) {
            return userIdAttr;
        }
        try {
            return Long.valueOf(auth.getName());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid authenticated user id");
        }
    }

    /** 1. Create address for current client */
    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<AddressDto> createAddress(Authentication auth,
                                                    @RequestAttribute(name = "userId", required = false) Long userIdAttr,
                                                    @RequestBody AddressDto dto) {
        Long clientId = resolveClientId(auth, userIdAttr);
        AddressDto created = addressService.createAddress(clientId, dto);
        return ResponseEntity.ok(created);
    }

    /** 2. Get all addresses for current client */
    @GetMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<AddressDto>> listAddresses(Authentication auth,
                                                         @RequestAttribute(name = "userId", required = false) Long userIdAttr) {
        Long clientId = resolveClientId(auth, userIdAttr);
        List<AddressDto> list = addressService.getAddressesByClientId(clientId);
        return ResponseEntity.ok(list);
    }

    /** 3. Update address */
    @PutMapping("/{addressId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<AddressDto> updateAddress(@PathVariable Long addressId, @RequestBody AddressDto dto) {
        AddressDto updated = addressService.updateAddress(addressId, dto);
        return ResponseEntity.ok(updated);
    }

    /** 4. Delete address */
    @DeleteMapping("/{addressId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<?> deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.noContent().build();
    }
}
