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
  CartesianGrid,
} from "recharts";

import {
  Package,
  CheckCircle,
  Truck,
  Utensils,
} from "lucide-react";

import Navbar
from "../components/Navbar";

import {
  getDashboardStats,
} from "../services/foodService";

const Dashboard = () => {

  /*
  ========================================
  USER
  ========================================
  */

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const role =
    user?.role;

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
    });

  const [loading, setLoading] =
    useState(true);

  /*
  ========================================
  FETCH STATS
  ========================================
  */

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          setLoading(true);

          const data =
            await getDashboardStats();

          setStats(data);

        } catch (error) {

          console.log(
            "Dashboard Error:",
            error
          );

        } finally {

          setLoading(false);
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

    ...(role === "ngo"

      ? [
          {
            name: "Available",

            value:
              stats.availableFood,
          },
        ]

      : []),

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

  /*
  ========================================
  DASHBOARD CARDS
  ========================================
  */

  const cards = [

    {
      title:
        role === "donor"
          ? "My Donations"
          : "Total Donations",

      value:
        stats.totalDonations,

      icon:
        <Package size={24} />,

      bg:
        "from-blue-500 to-blue-600",
    },

    ...(role === "ngo"

      ? [
          {
            title:
              "Available Food",

            value:
              stats.availableFood,

            icon:
              <Utensils size={24} />,

            bg:
              "from-green-500 to-green-600",
          },
        ]

      : []),

    {
      title:
        role === "donor"
          ? "Claimed Donations"
          : "Claimed Food",

      value:
        stats.claimedFood,

      icon:
        <CheckCircle size={24} />,

      bg:
        "from-yellow-500 to-orange-500",
    },

    {
      title:
        role === "donor"
          ? "Delivered Donations"
          : "Delivered Food",

      value:
        stats.deliveredFood,

      icon:
        <Truck size={24} />,

      bg:
        "from-purple-500 to-purple-600",
    },
  ];

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <Navbar />

      {/* ========================================
          MAIN CONTAINER
      ======================================== */}

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-orange-50
          to-blue-50
        "
      >
        <div
          className="
            max-w-6xl
            mx-auto
            px-4
            py-8
          "
        >
          {/* ========================================
              HEADER
          ======================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >
            <div>
              <h1
                className="
                  text-4xl
                  font-bold
                  text-gray-900
                "
              >
                Dashboard
              </h1>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mt-2
                "
              >
                <p
                  className="
                    text-gray-500
                  "
                >
                  Welcome back,
                  {" "}
                  <span
                    className="
                      font-semibold
                      text-gray-700
                    "
                  >
                    {user?.name || "User"}
                  </span>
                </p>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    ${
                      role === "ngo"
                        ? `
                          bg-green-100
                          text-green-700
                        `
                        : `
                          bg-blue-100
                          text-blue-700
                        `
                    }
                  `}
                >
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* ========================================
              LOADING
          ======================================== */}

          {loading ? (

            <div
              className="
                flex
                justify-center
                items-center
                h-[60vh]
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                  text-gray-600
                "
              >
                Loading Dashboard...
              </h2>
            </div>

          ) : (

            <>
              {/* ========================================
                  STATS CARDS
              ======================================== */}

              <div
                className={`
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  ${
                    role === "ngo"
                      ? "lg:grid-cols-4"
                      : "lg:grid-cols-3"
                  }
                  gap-6
                  mb-8
                `}
              >
                {cards.map(
                  (
                    card,
                    index
                  ) => (

                    <div
                      key={index}

                      className={`
                        bg-gradient-to-r
                        ${card.bg}
                        rounded-2xl
                        p-5
                        text-white
                        shadow-md
                        hover:shadow-xl
                        hover:-translate-y-1
                        transition-all
                        duration-300
                      `}
                    >
                      <div
                        className="
                          flex
                          justify-between
                          items-start
                          mb-6
                        "
                      >
                        <h3
                          className="
                            text-lg
                            font-semibold
                          "
                        >
                          {card.title}
                        </h3>

                        <div
                          className="
                            bg-white/20
                            p-3
                            rounded-xl
                          "
                        >
                          {card.icon}
                        </div>
                      </div>

                      <h2
                        className="
                          text-4xl
                          font-bold
                        "
                      >
                        {card.value}
                      </h2>
                    </div>
                  )
                )}
              </div>

              {/* ========================================
                  ANALYTICS SECTION
              ======================================== */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  shadow-sm
                  p-6
                "
              >
                {/* HEADER */}

                <div
                  className="
                    mb-6
                  "
                >
                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-gray-800
                    "
                  >
                    Food Analytics
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    Real-time donation statistics
                  </p>
                </div>

                {/* CHART */}

                <ResponsiveContainer
                  width="100%"
                  height={260}
                >
                  <BarChart
                    data={chartData}
                  >
                    <CartesianGrid
                      strokeDasharray="
                        3 3
                      "
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"

                      fill="#3b82f6"

                      radius={[
                        10,
                        10,
                        0,
                        0,
                      ]}

                      barSize={70}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;