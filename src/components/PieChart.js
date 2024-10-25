import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PropTypes from "prop-types";
import { chartColors } from "../utility";

const CustomPieChart = ({ title, categoryData }) => {
  if (!categoryData || categoryData.length === 0) {
    return <h2 className="text-center">No data available for {title}</h2>;
  }

  // Ensure each category has a name before rendering the chart
  const validData = categoryData.filter(data => data.name && data.value);

  if (validData.length === 0) {
    return <h2 className="text-center">No valid data available for {title}</h2>;
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h3 className="text-center">{title}</h3>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          <Pie
            data={validData} // Ensure we use valid data
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {validData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

CustomPieChart.propTypes = {
  title: PropTypes.string.isRequired,
  categoryData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Ensure that name is required
      value: PropTypes.number.isRequired
    })
  ).isRequired,
};

export default CustomPieChart;
