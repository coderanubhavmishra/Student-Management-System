import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../services/dashboardService";

function Courses() {

  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await getDashboardData();
      setStudents(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const courseMap = {};

  students.forEach((student) => {
    courseMap[student.course] =
      (courseMap[student.course] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Courses
        </h1>

        <p className="text-gray-600 mb-8">
          Click a course to view its students
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {Object.entries(courseMap).map(([course, count]) => (

            <div
              key={course}
              onClick={() =>
                navigate(`/students?course=${encodeURIComponent(course)}`)
              }
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">
                    {course}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {count} Student{count > 1 ? "s" : ""}
                  </p>

                </div>

                <div className="bg-blue-600 p-4 rounded-full text-white">

                  <GraduationCap size={30} />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Courses;