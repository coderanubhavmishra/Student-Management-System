import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addStudent } from "../services/studentService";
import StudentForm from "../components/student/StudentForm";

function AddStudent() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        try {
            await addStudent(student);

            toast.success("Student added successfully!");

            navigate("/students");

        } catch (error) {

            console.error(error);

            toast.error("Failed to add student!");

        } finally {

            setLoading(false);

        }
    };

    return (
        <StudentForm
            student={student}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/students")}
            buttonText={loading ? "Saving..." : "Save Student"}
        />
    );
}

export default AddStudent;