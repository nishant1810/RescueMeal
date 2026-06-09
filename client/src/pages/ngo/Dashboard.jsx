import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  Utensils,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

/*
========================================
LAYOUT
========================================
*/

import DashboardLayout from "../../layouts/DashboardLayout.jsx";

/*
========================================
SERVICES
========================================
*/

import {
  getDashboardStats,
} from "../../services/food.service.js";

/*
========================================
UI COMPONENTS
========================================
*/

import Loader from "../../components/ui/Loader.jsx";

import EmptyState from "../../components/ui/EmptyState.jsx";

import PageHeader from "../../components/ui/PageHeader.jsx";

import Button from "../../components/ui/Button.jsx";

/*
========================================
DASHBOARD COMPONENTS
========================================
*/

import StatsCard from "../../components/dashboard/StatsCard.jsx";

import DashboardGrid from "../../components/dashboard/DashboardGrid.jsx";

import SectionCard from "../../components/dashboard/SectionCard.jsx";

import AnalyticsChart from "../../components/dashboard/AnalyticsChart.jsx";

/*
========================================
NGO DASHBOARD
========================================
*/

const Dashboard = () => {

  /*
  ========================================
  QUERY
  ========================================
  */

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({

    queryKey: [
      "dashboard-stats",
    ],

    queryFn:
      getDashboardStats,
  });

  /*
  ========================================
  LOADING
  ========================================
  */

  if (isLoading) {

    return (

      <DashboardLayout>

        <Loader
          fullScreen
          text="Loading NGO dashboard..."
        />

      </DashboardLayout>
    );
  }

  /*
  ========================================
  ERROR
  ========================================
  */

  if (isError) {

    return (

      <DashboardLayout>

        <EmptyState

          title="Failed to Load Dashboard"

          description="Something went wrong while loading NGO dashboard data."
        />

      </DashboardLayout>
    );
  }

  /*
  ========================================
  ANALYTICS CHECK
  ========================================
  */

  const hasAnalyticsData =

    (stats?.availableFood || 0) > 0 ||

    (stats?.claimedFood || 0) > 0 ||

    (stats?.pendingDeliveries || 0) > 0 ||

    (stats?.deliveredFood || 0) > 0;

  /*
  ========================================
  CHART DATA
  ========================================
  */

  const chartData = [

    {
      name: "Available",
      value:
        stats?.availableFood || 0,
    },

    {
      name: "Claimed",
      value:
        stats?.claimedFood || 0,
    },

    {
      name: "Pending",
      value:
        stats?.pendingDeliveries || 0,
    },

    {
      name: "Delivered",
      value:
        stats?.deliveredFood || 0,
    },
  ];

  return (

    <DashboardLayout>

      <div

        className="
          max-w-7xl
          mx-auto
          space-y-8
        "
      >

        {/* ========================================
            PAGE HEADER
        ======================================== */}

        <PageHeader

          title="NGO Dashboard"

          description="Manage claimed food and monitor food rescue operations."

          action={

            <Link
              to="/ngo/available-food"
            >

              <Button>

                Browse Food

              </Button>

            </Link>
          }
        />

        {/* ========================================
            STATS GRID
        ======================================== */}

        <DashboardGrid>

          <StatsCard

            title="Available Food"

            value={
              stats?.availableFood || 0
            }

            color="bg-gradient-to-r from-orange-500 to-amber-400"

            icon={
              <Utensils size={30} />
            }
          />

          <StatsCard

            title="Claimed Food"

            value={
              stats?.claimedFood || 0
            }

            color="bg-gradient-to-r from-green-500 to-emerald-400"

            icon={
              <CheckCircle size={30} />
            }
          />

          <StatsCard

            title="Pending Deliveries"

            value={
              stats?.pendingDeliveries || 0
            }

            color="bg-gradient-to-r from-yellow-500 to-orange-400"

            icon={
              <Clock size={30} />
            }
          />

          <StatsCard

            title="Delivered Food"

            value={
              stats?.deliveredFood || 0
            }

            color="bg-gradient-to-r from-blue-500 to-cyan-400"

            icon={
              <Truck size={30} />
            }
          />

        </DashboardGrid>

        {/* ========================================
            ANALYTICS SECTION
        ======================================== */}

        <SectionCard
          title="NGO Analytics"
        >

          {hasAnalyticsData ? (

            <AnalyticsChart
              data={chartData}
            />

          ) : (

            <div

              className="
                flex
                flex-col
                items-center
                justify-center
                min-h-[320px]
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
                  text-gray-500
                  mt-4
                  text-lg
                "
              >

                Browse available food to start rescue operations.

              </p>

            </div>
          )}

        </SectionCard>

        {/* ========================================
            QUICK ACTIONS
        ======================================== */}

        <div

          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* AVAILABLE FOOD */}

          <div

            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-8
              hover:shadow-lg
              transition-all
              duration-300
            "
          >

            <h2

              className="
                text-2xl
                font-bold
                text-gray-900
                mb-3
              "
            >

              Available Food

            </h2>

            <p

              className="
                text-gray-500
                mb-6
                leading-relaxed
              "
            >

              Browse nearby food donations and claim food for distribution.

            </p>

            <Link
              to="/ngo/available-food"
            >

              <Button>

                View Available Food

              </Button>

            </Link>

          </div>

          {/* CLAIMED FOOD */}

          <div

            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-8
              hover:shadow-lg
              transition-all
              duration-300
            "
          >

            <h2

              className="
                text-2xl
                font-bold
                text-gray-900
                mb-3
              "
            >

              Claimed Deliveries

            </h2>

            <p

              className="
                text-gray-500
                mb-6
                leading-relaxed
              "
            >

              Track all claimed food and monitor delivery operations.

            </p>

            <Link
              to="/ngo/claimed-food"
            >

              <Button
                variant="success"
              >

                Track Deliveries

              </Button>

            </Link>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;