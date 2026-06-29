import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function CoursePieChart({ students }) {

  const courseCount = {};

  students.forEach((student) => {
    courseCount[student.course] =
      (courseCount[student.course] || 0) + 1;
  });

  const data = {
    labels: Object.keys(courseCount),
    datasets: [
      {
        data: Object.values(courseCount),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Course Distribution
      </h2>

      <Pie data={data} options={options} />

    </div>
  );
}

export default CoursePieChart;