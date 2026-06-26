package com.anubhav.studentmanagementsystem.repository;

import com.anubhav.studentmanagementsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

}