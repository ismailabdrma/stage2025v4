// Admin.java
package com.example.stage2025.entity;

import com.example.stage2025.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.*;

@Entity
@PrimaryKeyJoinColumn(name = "user_id")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Admin extends User {

    public Admin(String username, String email, String password, Role role) {
        super();
        super.setUsername(username);
        super.setEmail(email);
        super.setPassword(password);
        super.setRole(role);
    }
    // Add admin-specific fields if needed
}
