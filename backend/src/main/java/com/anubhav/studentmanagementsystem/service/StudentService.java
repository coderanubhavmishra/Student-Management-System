package com.anubhav.studentmanagementsystem.service;

import com.anubhav.studentmanagementsystem.entity.Student;
import com.anubhav.studentmanagementsystem.exception.StudentNotFoundException;
import com.anubhav.studentmanagementsystem.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.anubhav.studentmanagementsystem.dto.StudentRequest;
import com.anubhav.studentmanagementsystem.dto.StudentResponse;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Save Student
    public StudentResponse saveStudent(StudentRequest request) {

        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setCourse(request.getCourse());
        student.setMobile(request.getMobile());

        Student savedStudent = studentRepository.save(student);

        StudentResponse response = new StudentResponse();
        response.setId(savedStudent.getId());
        response.setName(savedStudent.getName());
        response.setEmail(savedStudent.getEmail());
        response.setCourse(savedStudent.getCourse());
        response.setMobile(savedStudent.getMobile());

        return response;
    }

    // Get All Students
    public List<StudentResponse> getAllStudents() {

        List<Student> students = studentRepository.findAll();

        return students.stream().map(student -> {

            StudentResponse response = new StudentResponse();

            response.setId(student.getId());
            response.setName(student.getName());
            response.setEmail(student.getEmail());
            response.setCourse(student.getCourse());
            response.setMobile(student.getMobile());

            return response;

        }).toList();
    }
    public StudentResponse getStudentById(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student with id " + id + " not found"));

        StudentResponse response = new StudentResponse();

        response.setId(student.getId());
        response.setName(student.getName());
        response.setEmail(student.getEmail());
        response.setCourse(student.getCourse());
        response.setMobile(student.getMobile());

        return response;
    }
    public StudentResponse updateStudent(Long id, StudentRequest request) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student with id " + id + " not found"));

        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setCourse(request.getCourse());
        student.setMobile(request.getMobile());

        Student updatedStudent = studentRepository.save(student);

        StudentResponse response = new StudentResponse();

        response.setId(updatedStudent.getId());
        response.setName(updatedStudent.getName());
        response.setEmail(updatedStudent.getEmail());
        response.setCourse(updatedStudent.getCourse());
        response.setMobile(updatedStudent.getMobile());

        return response;
    }
public void deleteStudent(Long id) {

    Student student = studentRepository.findById(id)
            .orElseThrow(() ->
                    new StudentNotFoundException("Student with id " + id + " not found"));

    studentRepository.delete(student);
}
}
