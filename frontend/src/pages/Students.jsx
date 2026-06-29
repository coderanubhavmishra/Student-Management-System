import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pencil, Eye, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import Statistics from "../components/dashboard/Statistics";

import {
  getAllStudents,
  deleteStudent,
} from "../services/studentService";

function Students() {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const studentsPerPage = 5;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedCourse = searchParams.get("course");
  useEffect(() => {
    loadStudents();
  }, [currentPage, search, sortBy, selectedCourse]);

  const loadStudents = async () => {
    setLoading(true);

    try {
      const response = await getAllStudents(
        currentPage - 1,
        studentsPerPage,
        search,
        sortBy
      );

      setAllStudents(response.data.content);

      if (selectedCourse) {

          const filtered = response.data.content.filter(
              student => student.course === selectedCourse
          );

          setStudents(filtered);

      } else {

          setStudents(response.data.content);

      }
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    try {
      await deleteStudent(id);

      toast.success("Student deleted successfully!");

      loadStudents();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <h2 className="text-xl font-semibold text-blue-600">
            Loading students...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8">
          Student Management System
        </h1>

        <Statistics students={students} />
        {selectedCourse && (

            <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">

                <div>

                    <span className="font-semibold">
                        Showing students from:
                    </span>{" "}
                    <span className="text-blue-700 font-bold">
                        {selectedCourse}
                    </span>

                </div>

                <button
                    onClick={() => navigate("/students")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Clear Filter
                </button>

            </div>

        )}

        {/* Search + Sort + Add Student */}

        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">

          <input
            type="text"
            placeholder="🔍 Search by name, email or course..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg p-3"
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="course">Sort by Course</option>
          </select>

          <button
            onClick={() => navigate("/add-student")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 whitespace-nowrap"
          >
            + Add Student
          </button>

        </div>

        {/* Table */}

        <div className="overflow-x-auto bg-white rounded-lg shadow">

          <table className="w-full">

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

              {students.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 text-lg"
                  >
                    No students found.
                  </td>

                </tr>

              ) : (

                students.map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-100 transition"
                  >

                    <td className="p-3">{student.id}</td>

                    <td className="p-3">{student.name}</td>

                    <td className="p-3">{student.email}</td>

                    <td className="p-3">{student.course}</td>

                    <td className="p-3">{student.mobile}</td>

                    <td className="p-3">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            navigate(`/view-student/${student.id}`)
                          }
                          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/edit-student/${student.id}`)
                          }
                          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(student.id)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}

        <div className="flex justify-center items-center gap-4 mt-8">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            disabled={
              currentPage === totalPages || totalPages === 0
            }
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default Students;