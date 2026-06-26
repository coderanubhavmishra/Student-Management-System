package com.anubhav.studentmanagementsystem.controller;

import com.anubhav.studentmanagementsystem.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.anubhav.studentmanagementsystem.dto.StudentRequest;
import com.anubhav.studentmanagementsystem.dto.StudentResponse;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Add Student
    @PostMapping
    public StudentResponse addStudent(@Valid @RequestBody StudentRequest request) {
        return studentService.saveStudent(request);
    }

    // Get All Students
    @GetMapping
    public List<StudentResponse> getAllStudents() {
        return studentService.getAllStudents();
    }
    @GetMapping("/{id}")
    public StudentResponse getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }
    @PutMapping("/{id}")
    public StudentResponse updateStudent(@PathVariable Long id,
                                         @Valid @RequestBody StudentRequest request) {

        return studentService.updateStudent(id, request);
    }
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully!";
    }
}