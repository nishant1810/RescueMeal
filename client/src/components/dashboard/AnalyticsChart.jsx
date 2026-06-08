import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/*
========================================
ANALYTICS CHART
========================================
*/

const AnalyticsChart =
  ({ data = [] }) => {

    /*
    ========================================
    EMPTY STATE
    ========================================
    */

    const hasData =
      data.some(
        (item) => item.value > 0
      );

    /*
    ========================================
    NO DATA UI
    ========================================
    */

    if (!hasData) {

      return (

        <div

          className="
            flex
            flex-col
            items-center
            justify-center
            h-[320px]
            text-center
          "
        >

          <h2

            className="
              text-4xl
              font-extrabold
              text-gray-900
            "
          >

            No Analytics Data

          </h2>

          <p

            className="
              mt-4
              text-lg
              text-gray-500
            "
          >

            Start donating food to track analytics.

          </p>

        </div>
      );
    }

    return (

      <div

        className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          shadow-sm
          p-8
        "
      >

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-8">

          <h2

            className="
              text-4xl
              font-extrabold
              text-gray-900
            "
          >

            Analytics

          </h2>

          <p

            className="
              text-gray-500
              mt-2
              text-lg
            "
          >

            Real-time donation insights and activity.

          </p>

        </div>

        {/* ========================================
            CHART
        ======================================== */}

        <div className="h-[380px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={data}
              barSize={70}
            >

              {/* GRID */}

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              {/* X AXIS */}

              <XAxis

                dataKey="name"

                tick={{
                  fontSize: 16,
                  fontWeight: 600,
                }}

                tickLine={false}

                axisLine={false}
              />

              {/* Y AXIS */}

              <YAxis

                allowDecimals={false}

                tick={{
                  fontSize: 14,
                }}

                tickLine={false}

                axisLine={false}
              />

              {/* TOOLTIP */}

              <Tooltip

                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />

              {/* LEGEND */}

              <Legend />

              {/* BAR */}

              <Bar

                dataKey="value"

                radius={[14, 14, 0, 0]}

                fill="#F97316"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
    );
  };

export default AnalyticsChart;