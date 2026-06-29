import api from "./api";

export const getAllStudents = (
    page = 0,
    size = 5,
    search = "",
    sortBy = "id"
) =>
    api.get(
        `/students?page=${page}&size=${size}&search=${encodeURIComponent(search)}&sortBy=${sortBy}`
    );

export const getStudentById = (id) =>
    api.get(`/students/${id}`);

export const addStudent = (student) =>
    api.post("/students", student);

export const updateStudent = (id, student) =>
    api.put(`/students/${id}`, student);

export const deleteStudent = (id) =>
    api.delete(`/students/${id}`);