import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, Trash2 } from "lucide-react";

import { getAllStudents } from "../services/studentService";

function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Student Management System
        </h1>

        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Course</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">{student.mobile}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => navigate(`/view-student/${student.id}`)}
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                      title="View Student"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => navigate(`/edit-student/${student.id}`)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                      title="Edit Student"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      title="Delete Student"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;