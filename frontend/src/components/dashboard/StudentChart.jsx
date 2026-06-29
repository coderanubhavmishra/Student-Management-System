import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function StudentChart({ students }) {

  const courseCount = {};

  students.forEach((student) => {
    courseCount[student.course] =
      (courseCount[student.course] || 0) + 1;
  });

  const data = {
    labels: Object.keys(courseCount),
    datasets: [
      {
        label: "Students",
        data: Object.values(courseCount),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Students by Course
      </h2>

      <Bar data={data} options={options} />

    </div>
  );
}

export default StudentChart;