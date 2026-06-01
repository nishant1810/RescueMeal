import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AnalyticsChart = ({
  stats,
}) => {
  const data = [
    {
      name: "Available",

      value:
        stats.availableFood,
    },

    {
      name: "Claimed",

      value:
        stats.claimedFood,
    },

    {
      name: "Picked",

      value:
        stats.pickedFood,
    },

    {
      name: "Delivered",

      value:
        stats.deliveredFood,
    },
  ];

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      mt-10
    "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
      "
      >
        Food Analytics
      </h2>

      <div
        className="
        h-96
      "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;