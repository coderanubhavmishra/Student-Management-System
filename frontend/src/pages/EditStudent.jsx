import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import StudentForm from "../components/student/StudentForm";
import {
    getStudentById,
    updateStudent
} from "../services/studentService";

function EditStudent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: "",
        mobile: ""
    });

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

            await updateStudent(id, student);

            toast.success("Student updated successfully!");

            navigate("/students");

        } catch (error) {

            console.error(error);

            toast.error("Update failed!");

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
            buttonText="Update Student"
        />
    );

}

export default EditStudent;