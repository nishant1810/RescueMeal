import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AnalyticsChart = ({
  stats,
}) => {
  const data = [
    {
      name: "Available",
      value:
        stats?.availableFood ||
        0,
    },

    {
      name: "Claimed",
      value:
        stats?.claimedFood || 0,
    },

    {
      name: "Delivered",
      value:
        stats?.deliveredFood ||
        0,
    },
  ];

  return (
    <div
      className="
      bg-white
      p-6
      rounded-2xl
      shadow-md
      w-full
      min-w-0
    "
    >
      <h2
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Food Analytics
      </h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#22c55e"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;