function DashboardCard({
  title,
  value,
  icon,
  color,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300
      ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className={`${color} p-4 rounded-full text-white`}>
          {icon}
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;