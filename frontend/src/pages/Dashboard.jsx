import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Students</h2>
          <p className="text-4xl font-bold text-blue-600">25</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Courses</h2>
          <p className="text-4xl font-bold text-green-600">4</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">New Today</h2>
          <p className="text-4xl font-bold text-purple-600">3</p>
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

    </div>
  );
}

export default Dashboard;