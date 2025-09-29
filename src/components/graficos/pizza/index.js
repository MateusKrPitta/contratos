import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CustomPieChart = ({ data }) => {
  const COLORS = ["#2C5282", "#0CA84A", "#FAF104", "#FF8042"];

  return (
    <PieChart width={450} height={350}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        labelLine={false}
        label={({ name, percent }) => (
          <span style={{ fontSize: "10px" }}>{`${name}: ${(
            percent * 100
          ).toFixed(0)}%`}</span>
        )}
        outerRadius={80}
        fill="#8884d8"
        dataKey="total_saida"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        wrapperStyle={{
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "10px",
        }}
      />
    </PieChart>
  );
};

export default CustomPieChart;
