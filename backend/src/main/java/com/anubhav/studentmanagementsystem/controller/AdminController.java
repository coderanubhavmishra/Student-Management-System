package com.anubhav.studentmanagementsystem.controller;

import com.anubhav.studentmanagementsystem.dto.AdminRequest;
import com.anubhav.studentmanagementsystem.dto.AdminResponse;
import com.anubhav.studentmanagementsystem.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<AdminResponse> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @PostMapping
    public AdminResponse createAdmin(@RequestBody AdminRequest request) {
        return adminService.createAdmin(request);
    }

    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
    }
}