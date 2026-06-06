import React, {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Truck,
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";

import Navbar
from "../components/layout/Navbar";

import {
  getVolunteerHistory,
} from "../services/deliveryService";

const VolunteerDashboard = () => {

  /*
  ========================================
  STATE
  ========================================
  */

  const [
    deliveries,

    setDeliveries,
  ] = useState([]);

  const [
    loading,

    setLoading,
  ] = useState(true);

  /*
  ========================================
  FETCH HISTORY
  ========================================
  */

  useEffect(() => {

    const fetchHistory =
      async () => {

        try {

          setLoading(true);

          const data =
            await getVolunteerHistory();

          setDeliveries(
            data || []
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchHistory();

  }, []);

  /*
  ========================================
  STATS
  ========================================
  */

  const totalDeliveries =
    deliveries.length;

  const acceptedDeliveries =
    deliveries.filter(
      (item) =>
        item.status ===
        "accepted"
    ).length;

  const pickedDeliveries =
    deliveries.filter(
      (item) =>
        item.status ===
        "picked"
    ).length;

  const deliveredDeliveries =
    deliveries.filter(
      (item) =>
        item.status ===
        "delivered"
    ).length;

  /*
  ========================================
  CHART DATA
  ========================================
  */

  const chartData = [

    {
      name: "Accepted",

      value:
        acceptedDeliveries,
    },

    {
      name: "Picked",

      value:
        pickedDeliveries,
    },

    {
      name: "Delivered",

      value:
        deliveredDeliveries,
    },
  ];

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <Navbar />

      {/* ========================================
          PAGE
      ======================================== */}

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-orange-50
          to-blue-50
          py-10
        "
      >
        {/* ========================================
            CONTAINER
        ======================================== */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* ========================================
              HEADER
          ======================================== */}

          <div
            className="
              mb-10
            "
          >
            <h1
              className="
                text-4xl
                md:text-5xl
                font-bold
                text-slate-900
              "
            >
              Volunteer Dashboard
            </h1>

            <p
              className="
                text-slate-500
                mt-3
                text-lg
              "
            >
              Track and manage your deliveries
            </p>
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
                h-[50vh]
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                  text-slate-600
                "
              >
                Loading dashboard...
              </h2>
            </div>

          ) : (

            <>
              {/* ========================================
                  STATS GRID
              ======================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-4
                  gap-6
                  mb-10
                "
              >
                {/* TOTAL */}

                <div
                  className="
                    bg-white/90
                    backdrop-blur-md
                    rounded-3xl
                    shadow-lg
                    border
                    border-white/50
                    p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-slate-500
                          text-sm
                        "
                      >
                        Total Deliveries
                      </p>

                      <h2
                        className="
                          text-4xl
                          font-bold
                          text-orange-500
                          mt-2
                        "
                      >
                        {
                          totalDeliveries
                        }
                      </h2>
                    </div>

                    <Truck
                      size={45}

                      className="
                        text-orange-400
                      "
                    />
                  </div>
                </div>

                {/* ACCEPTED */}

                <div
                  className="
                    bg-white/90
                    backdrop-blur-md
                    rounded-3xl
                    shadow-lg
                    border
                    border-white/50
                    p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-slate-500
                          text-sm
                        "
                      >
                        Accepted
                      </p>

                      <h2
                        className="
                          text-4xl
                          font-bold
                          text-blue-500
                          mt-2
                        "
                      >
                        {
                          acceptedDeliveries
                        }
                      </h2>
                    </div>

                    <Clock
                      size={45}

                      className="
                        text-blue-400
                      "
                    />
                  </div>
                </div>

                {/* PICKED */}

                <div
                  className="
                    bg-white/90
                    backdrop-blur-md
                    rounded-3xl
                    shadow-lg
                    border
                    border-white/50
                    p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-slate-500
                          text-sm
                        "
                      >
                        Picked
                      </p>

                      <h2
                        className="
                          text-4xl
                          font-bold
                          text-purple-500
                          mt-2
                        "
                      >
                        {
                          pickedDeliveries
                        }
                      </h2>
                    </div>

                    <Package
                      size={45}

                      className="
                        text-purple-400
                      "
                    />
                  </div>
                </div>

                {/* DELIVERED */}

                <div
                  className="
                    bg-white/90
                    backdrop-blur-md
                    rounded-3xl
                    shadow-lg
                    border
                    border-white/50
                    p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-slate-500
                          text-sm
                        "
                      >
                        Delivered
                      </p>

                      <h2
                        className="
                          text-4xl
                          font-bold
                          text-green-500
                          mt-2
                        "
                      >
                        {
                          deliveredDeliveries
                        }
                      </h2>
                    </div>

                    <CheckCircle
                      size={45}

                      className="
                        text-green-400
                      "
                    />
                  </div>
                </div>
              </div>

              {/* ========================================
                  ANALYTICS
              ======================================== */}

              <div
                className="
                  bg-white/90
                  backdrop-blur-md
                  rounded-3xl
                  shadow-xl
                  border
                  border-white/50
                  p-8
                "
              >
                {/* HEADER */}

                <div
                  className="
                    mb-8
                  "
                >
                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-slate-900
                    "
                  >
                    Delivery Analytics
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-2
                    "
                  >
                    Real-time volunteer statistics
                  </p>
                </div>

                {/* CHART */}

                <ResponsiveContainer
                  width="100%"
                  height={400}
                >
                  <BarChart
                    data={chartData}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"

                      fill="#f97316"

                      radius={[
                        12,
                        12,
                        0,
                        0,
                      ]}
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

export default VolunteerDashboard;