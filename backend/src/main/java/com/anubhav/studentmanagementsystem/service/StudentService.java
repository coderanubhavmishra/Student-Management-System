package com.anubhav.studentmanagementsystem.service;

import com.anubhav.studentmanagementsystem.entity.Student;
import com.anubhav.studentmanagementsystem.exception.StudentNotFoundException;
import com.anubhav.studentmanagementsystem.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.anubhav.studentmanagementsystem.dto.StudentRequest;
import com.anubhav.studentmanagementsystem.dto.StudentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    public Page<StudentResponse> getAllStudents(
            int page,
            int size,
            String search,
            String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Page<Student> students;

        if (search == null || search.isBlank()) {

            students = studentRepository.findAll(pageable);

        } else {

            students = studentRepository
                    .findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrCourseContainingIgnoreCase(
                            search,
                            search,
                            search,
                            pageable
                    );
        }

        return students.map(student -> {

            StudentResponse response = new StudentResponse();

            response.setId(student.getId());
            response.setName(student.getName());
            response.setEmail(student.getEmail());
            response.setCourse(student.getCourse());
            response.setMobile(student.getMobile());

            return response;
        });
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
