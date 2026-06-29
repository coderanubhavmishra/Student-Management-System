import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";

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
  const totalCourses = new Set(students.map(s => s.course)).size;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome to Student Management System
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Total Students</h2>
          <p className="text-4xl font-bold text-blue-600">
            {totalStudents}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Courses</h2>
          <p className="text-4xl font-bold text-green-600">
            {totalCourses}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Pages</h2>
          <p className="text-4xl font-bold text-purple-600">
            {Math.ceil(totalStudents / 5)}
          </p>
        </div>

      </div>

      <div className="mt-10 flex gap-4">

        <Link
          to="/students"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          View Students
        </Link>

        <Link
          to="/add-student"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Add Student
        </Link>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Students
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Course</th>
              <th className="text-left py-2">Email</th>
            </tr>
          </thead>

          <tbody>

            {students.slice(-5).reverse().map(student => (

              <tr key={student.id} className="border-b">

                <td className="py-2">{student.name}</td>
                <td>{student.course}</td>
                <td>{student.email}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;