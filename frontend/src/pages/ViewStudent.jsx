import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    User,
    Mail,
    GraduationCap,
    Phone,
    BadgeCheck,
    ArrowLeft,
    Pencil,
} from "lucide-react";
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
                <div className="flex flex-col items-center gap-4">

                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

                    <h2 className="text-xl font-semibold">
                        Loading Student...
                    </h2>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 flex flex-col items-center">

                    <div className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center text-5xl font-bold shadow-lg">

                        {student.name.charAt(0).toUpperCase()}

                    </div>

                    <h1 className="text-3xl font-bold mt-5">
                        {student.name}
                    </h1>

                    <p className="text-blue-100 mt-2">
                        Student ID : #{student.id}
                    </p>

                </div>

                {/* Details */}

                <div className="p-8 space-y-6">

                    <div className="flex items-center gap-4 border-b pb-4">

                        <User className="text-blue-600" size={24} />

                        <div>
                            <p className="text-gray-500 text-sm">Full Name</p>
                            <p className="text-lg font-semibold">
                                {student.name}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 border-b pb-4">

                        <Mail className="text-green-600" size={24} />

                        <div>
                            <p className="text-gray-500 text-sm">Email Address</p>
                            <p className="text-lg font-semibold">
                                {student.email}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 border-b pb-4">

                        <GraduationCap
                            className="text-purple-600"
                            size={24}
                        />

                        <div>
                            <p className="text-gray-500 text-sm">Course</p>
                            <p className="text-lg font-semibold">
                                {student.course}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 border-b pb-4">

                        <Phone className="text-red-600" size={24} />

                        <div>
                            <p className="text-gray-500 text-sm">Mobile Number</p>
                            <p className="text-lg font-semibold">
                                {student.mobile}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <BadgeCheck
                            className="text-emerald-600"
                            size={24}
                        />

                        <div>
                            <p className="text-gray-500 text-sm">Status</p>
                            <p className="text-lg font-semibold text-green-600">
                                Active Student
                            </p>
                        </div>

                    </div>

                </div>

                {/* Buttons */}

                <div className="bg-gray-50 px-8 py-6 flex flex-col sm:flex-row gap-4">

                    <button
                        onClick={() => navigate("/students")}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <button
                        onClick={() => navigate(`/edit-student/${student.id}`)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Pencil size={18} />
                        Edit Student
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ViewStudent;