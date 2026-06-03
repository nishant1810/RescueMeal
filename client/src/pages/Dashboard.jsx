import React, {
  useEffect,
  useState,
} from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Navbar
from "../components/Navbar";

import StatsCard
from "../components/StatsCard";

import {
  getDashboardStats,
} from "../services/foodService";

const Dashboard = () => {

  /*
  ========================================
  STATE
  ========================================
  */

  const [stats, setStats] =
    useState({
      totalDonations: 0,
      availableFood: 0,
      claimedFood: 0,
      deliveredFood: 0,
      pickedDeliveries: 0,
    });

  /*
  ========================================
  FETCH DASHBOARD STATS
  ========================================
  */

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const data =
            await getDashboardStats();

          setStats(data);

        } catch (error) {

          console.log(error);
        }
      };

    fetchStats();

  }, []);

  /*
  ========================================
  CHART DATA
  ========================================
  */

  const chartData = [
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
      name: "Delivered",
      value:
        stats.deliveredFood,
    },
  ];

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <Navbar />

      {/* ========================================
          DASHBOARD CONTAINER
      ======================================== */}

      <div
        className="
          p-6
          bg-gray-100
          min-h-screen
        "
      >
        {/* ========================================
            PAGE TITLE
        ======================================== */}

        <h1
          className="
            text-4xl
            font-bold
            mb-8
            text-gray-800
          "
        >
          Dashboard
        </h1>

        {/* ========================================
            STATS CARDS
        ======================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
            mb-10
          "
        >
          <StatsCard
            title="Total Donations"
            value={
              stats.totalDonations
            }
            color="bg-blue-500"
          />

          <StatsCard
            title="Available Food"
            value={
              stats.availableFood
            }
            color="bg-green-500"
          />

          <StatsCard
            title="Claimed Food"
            value={
              stats.claimedFood
            }
            color="bg-yellow-500"
          />

          <StatsCard
            title="Delivered Food"
            value={
              stats.deliveredFood
            }
            color="bg-purple-500"
          />
        </div>

        {/* ========================================
            ANALYTICS CHART
        ======================================== */}

        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow-lg
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              mb-6
              text-gray-700
            "
          >
            Food Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={chartData}
            >
              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;