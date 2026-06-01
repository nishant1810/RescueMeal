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
  "#f97316",
  "#ef4444",
];

const CategoryPieChart = ({
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
        Distribution
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
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={140}
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