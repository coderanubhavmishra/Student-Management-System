import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Shield } from "lucide-react";
import { toast } from "react-toastify";

import {
    getAllAdmins,
    deleteAdmin,
} from "../services/adminService";

function AdminManagement() {

    const navigate = useNavigate();

    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAdmins();
    }, []);

    const loadAdmins = async () => {

        setLoading(true);

        try {

            const response = await getAllAdmins();

            setAdmins(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load admins");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this admin?"
        );

        if (!confirmDelete) return;

        try {

            await deleteAdmin(id);

            toast.success("Admin deleted successfully!");

            loadAdmins();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data || "Failed to delete admin"
            );

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-lg font-semibold">
                        Loading Admins...
                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Admin Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage all administrators of the system
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/add-admin")}
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Plus size={18} />

                        Add Admin

                    </button>

                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <table className="w-full table-fixed">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="w-20 px-6 py-4 text-center">
                                    S. No.
                                </th>

                                <th className="w-1/3 px-6 py-4 text-left">
                                    Username
                                </th>

                                <th className="w-1/3 px-6 py-4 text-center">
                                    Role
                                </th>

                                <th className="w-32 px-6 py-4 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {admins.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center py-10 text-gray-500"
                                    >
                                        No admins found.
                                    </td>

                                </tr>

                            ) : (

                                admins.map((admin, index) => (

                                    <tr
                                        key={admin.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="px-6 py-4 text-center">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4 text-left font-medium">
                                            {admin.username}
                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            <span
                                                className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                    admin.role === "ROLE_SUPER_ADMIN"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                                {admin.role === "ROLE_SUPER_ADMIN"
                                                    ? "SUPER ADMIN"
                                                    : "ADMIN"}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            {admin.role !== "ROLE_SUPER_ADMIN" ? (

                                                <button
                                                    onClick={() => handleDelete(admin.id)}
                                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            ) : (

                                                <span className="text-gray-400 font-medium">
                                                    Protected
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default AdminManagement;