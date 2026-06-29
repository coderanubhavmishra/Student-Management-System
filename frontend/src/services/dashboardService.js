import api from "./api";

export const getDashboardData = () =>
    api.get("/students?page=0&size=1000");