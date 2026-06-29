import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import StudentChart from "../components/dashboard/StudentChart";
import CoursePieChart from "../components/dashboard/CoursePieChart";
function Dashboard() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardData();
      setStudents(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const totalStudents = students.length;
  const totalCourses = new Set(students.map((s) => s.course)).size;
  const totalPages = Math.ceil(totalStudents / 5);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome to Student Management System
        </p>

        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div
            onClick={() => navigate("/students")}
            className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition"
          >
            <h2 className="text-gray-500">Total Students</h2>
            <p className="text-4xl font-bold text-blue-600">
              {totalStudents}
            </p>
          </div>

          <div
            onClick={() => navigate("/courses")}
            className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition"
          >
            <h2 className="text-gray-500">Courses</h2>
            <p className="text-4xl font-bold text-green-600">
              {totalCourses}
            </p>
          </div>

          <div
            onClick={() => navigate("/students")}
            className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition"
          >
            <h2 className="text-gray-500">Pages</h2>
            <p className="text-4xl font-bold text-purple-600">
              {totalPages}
            </p>
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            to="/students"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Students
          </Link>

          <Link
            to="/add-student"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add Student
          </Link>

        </div>

        {/* Chart */}

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

           <StudentChart students={students} />

           <CoursePieChart students={students} />

       </div>

        {/* Recent Students */}

        <div className="mt-10 bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Students
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-gray-100">

                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Course</th>
                  <th className="text-left p-3">Email</th>

                </tr>

              </thead>

              <tbody>

                {students.length === 0 ? (

                  <tr>

                    <td
                      colSpan="3"
                      className="text-center py-8 text-gray-500"
                    >
                      No students found.
                    </td>

                  </tr>

                ) : (

                  students
                    .slice(-5)
                    .reverse()
                    .map((student) => (

                      <tr
                        key={student.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.course}</td>
                        <td className="p-3">{student.email}</td>

                      </tr>

                    ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;