import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-white">
          🎓 Student Management
        </h1>

        <div className="flex gap-6">

          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/students"
            className="text-white hover:text-yellow-300 transition"
          >
            Students
          </Link>

          <Link
            to="/add-student"
            className="text-white hover:text-yellow-300 transition"
          >
            Add Student
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;