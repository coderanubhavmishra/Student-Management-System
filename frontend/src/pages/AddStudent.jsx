import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../services/studentService";

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: "",
        mobile: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addStudent(student);
            alert("Student added successfully!");
            navigate("/students");
        } catch (error) {
            console.error(error);
            alert("Error adding student!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Add Student
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={student.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={student.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="course"
                        placeholder="Course"
                        value={student.course}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={student.mobile}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                    >
                        Save Student
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddStudent;