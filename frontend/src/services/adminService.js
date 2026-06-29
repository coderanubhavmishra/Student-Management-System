import api from "./api";

export const getAllAdmins = () => api.get("/admins");

export const createAdmin = (admin) => api.post("/admins", admin);

export const deleteAdmin = (id) => api.delete(`/admins/${id}`);