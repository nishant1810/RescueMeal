import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
];

const CategoryPieChart = ({
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
        Distribution
      </h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {data.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;