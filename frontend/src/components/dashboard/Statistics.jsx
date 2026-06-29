import {
  Users,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";

function Statistics({ students }) {

  const navigate = useNavigate();

  const totalStudents = students.length;

  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      <DashboardCard
        title="Total Students"
        value={totalStudents}
        icon={<Users size={28} />}
        color="bg-blue-600"
        onClick={() => navigate("/students")}
      />

      <DashboardCard
        title="Courses"
        value={totalCourses}
        icon={<GraduationCap size={28} />}
        color="bg-green-600"
        onClick={() => navigate("/courses")}
      />

      <DashboardCard
        title="Emails"
        value={totalStudents}
        icon={<Mail size={28} />}
        color="bg-purple-600"
      />

      <DashboardCard
        title="Mobile Numbers"
        value={totalStudents}
        icon={<Phone size={28} />}
        color="bg-red-600"
      />

    </div>

  );
}

export default Statistics;