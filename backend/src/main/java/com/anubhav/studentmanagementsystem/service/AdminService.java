package com.anubhav.studentmanagementsystem.service;

import com.anubhav.studentmanagementsystem.dto.AdminRequest;
import com.anubhav.studentmanagementsystem.dto.AdminResponse;
import com.anubhav.studentmanagementsystem.entity.User;
import com.anubhav.studentmanagementsystem.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Get all admins
    public List<AdminResponse> getAllAdmins() {

        return userRepository.findAll()
                .stream()
                .map(user -> new AdminResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getRole()))
                .toList();
    }

    // Create new admin
    public AdminResponse createAdmin(AdminRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists.");
        }

        User user = new User();

        user.setUsername(request.getUsername());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Every admin created from UI is ROLE_ADMIN
        user.setRole("ROLE_ADMIN");

        User savedUser = userRepository.save(user);

        return new AdminResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getRole()
        );
    }

    // Delete admin
    public void deleteAdmin(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        // Prevent deleting Super Admin
        if ("ROLE_SUPER_ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Super Admin cannot be deleted.");
        }

        userRepository.delete(user);
    }
}