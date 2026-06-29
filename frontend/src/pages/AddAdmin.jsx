import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AdminForm from "../components/admin/AdminForm";
import { createAdmin } from "../services/adminService";

function AddAdmin() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [admin, setAdmin] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {

        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await createAdmin(admin);

            toast.success("Admin created successfully!");

            navigate("/admin-management");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data || "Failed to create admin"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminForm
            admin={admin}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/admin-management")}
            buttonText="Create Admin"
        />

    );

}

export default AddAdmin;