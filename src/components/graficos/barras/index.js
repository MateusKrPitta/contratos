import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ProductsBarChart = ({ data }) => {
  const chartData = data.map((item) => ({
    produto: `${item.codigo} - ${item.produto}`,
    saidas: item.total_saida,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="produto"
          tick={{ fontSize: 8 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          label={{
            value: "Quantidade",
            angle: -90,
            position: "insideLeft",
            fontSize: 12,
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: "12px" }}
          formatter={(value) => [`${value} unidades`, "Total de saídas"]}
          labelFormatter={(label) => `Produto: ${label}`}
        />
        <Bar
          dataKey="saidas"
          fill="#2C5282"
          name="Saídas"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductsBarChart;
