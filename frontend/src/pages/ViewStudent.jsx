import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Mail, GraduationCap, Phone } from "lucide-react";
import { toast } from "react-toastify";

import { getStudentById } from "../services/studentService";

function ViewStudent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const response = await getStudentById(id);
            setStudent(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load student!");
        }
    };

    if (!student) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-2xl font-semibold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Student Details
                </h1>

                <div className="space-y-5">

                    <div className="flex items-center gap-3">
                        <User className="text-blue-600" />
                        <span><strong>Name:</strong> {student.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mail className="text-green-600" />
                        <span><strong>Email:</strong> {student.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <GraduationCap className="text-purple-600" />
                        <span><strong>Course:</strong> {student.course}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone className="text-red-600" />
                        <span><strong>Mobile:</strong> {student.mobile}</span>
                    </div>

                </div>

                <div className="flex gap-4 mt-8">

                    <button
                        onClick={() => navigate("/students")}
                        className="flex-1 bg-gray-600 text-white py-3 rounded hover:bg-gray-700"
                    >
                        Back
                    </button>

                    <button
                        onClick={() => navigate(`/edit-student/${student.id}`)}
                        className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                    >
                        Edit
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ViewStudent;