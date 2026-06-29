import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const navLinkClass = ({ isActive }) =>
        `transition font-medium ${
            isActive
                ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                : "text-white hover:text-yellow-300"
        }`;

    return (
        <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

                <h1 className="text-2xl font-bold text-white">
                    🎓 Student Management
                </h1>

                <div className="flex flex-wrap items-center gap-6">

                    <NavLink
                        to="/"
                        end
                        className={navLinkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/students"
                        className={navLinkClass}
                    >
                        Students
                    </NavLink>

                    <NavLink
                        to="/add-student"
                        className={navLinkClass}
                    >
                        Add Student
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;