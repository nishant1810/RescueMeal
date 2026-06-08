import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  Truck,
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";

/*
========================================
LAYOUT
========================================
*/

import DashboardLayout
from "../../layouts/DashboardLayout";

/*
========================================
SERVICES
========================================
*/

import {
  getDashboardStats,
} from "../../services/food.service";

/*
========================================
UI COMPONENTS
========================================
*/

import Loader
from "../../components/ui/Loader";

import EmptyState
from "../../components/ui/EmptyState";

import PageHeader
from "../../components/ui/PageHeader";

import Button
from "../../components/ui/Button";

/*
========================================
DASHBOARD COMPONENTS
========================================
*/

import StatsCard
from "../../components/dashboard/StatsCard";

import DashboardGrid
from "../../components/dashboard/DashboardGrid";

import SectionCard
from "../../components/dashboard/SectionCard";

import AnalyticsChart
from "../../components/dashboard/AnalyticsChart";

/*
========================================
VOLUNTEER DASHBOARD
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
          text="Loading volunteer dashboard..."
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

          description="Something went wrong while loading volunteer dashboard."
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

    (stats?.assignedDeliveries || 0) > 0 ||

    (stats?.pickedDeliveries || 0) > 0 ||

    (stats?.deliveredFood || 0) > 0 ||

    (stats?.pendingDeliveries || 0) > 0;

  /*
  ========================================
  CHART DATA
  ========================================
  */

  const chartData = [

    {
      name: "Assigned",
      value:
        stats?.assignedDeliveries || 0,
    },

    {
      name: "Picked Up",
      value:
        stats?.pickedDeliveries || 0,
    },

    {
      name: "Delivered",
      value:
        stats?.deliveredFood || 0,
    },

    {
      name: "Pending",
      value:
        stats?.pendingDeliveries || 0,
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

          title="Volunteer Dashboard"

          description="Manage food pickups and delivery operations."

          action={

            <Link
              to="/volunteer/deliveries"
            >

              <Button>

                View Deliveries

              </Button>

            </Link>
          }
        />

        {/* ========================================
            STATS GRID
        ======================================== */}

        <DashboardGrid>

          <StatsCard

            title="Assigned Deliveries"

            value={
              stats?.assignedDeliveries || 0
            }

            color="bg-gradient-to-r from-orange-500 to-amber-400"

            icon={
              <Package size={30} />
            }
          />

          <StatsCard

            title="Picked Up"

            value={
              stats?.pickedDeliveries || 0
            }

            color="bg-gradient-to-r from-blue-500 to-cyan-400"

            icon={
              <Truck size={30} />
            }
          />

          <StatsCard

            title="Delivered"

            value={
              stats?.deliveredFood || 0
            }

            color="bg-gradient-to-r from-green-500 to-emerald-400"

            icon={
              <CheckCircle size={30} />
            }
          />

          <StatsCard

            title="Pending"

            value={
              stats?.pendingDeliveries || 0
            }

            color="bg-gradient-to-r from-yellow-500 to-orange-400"

            icon={
              <Clock size={30} />
            }
          />

        </DashboardGrid>

        {/* ========================================
            ANALYTICS SECTION
        ======================================== */}

        <SectionCard
          title="Delivery Analytics"
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

                Delivery activity will appear here once assignments begin.

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

          {/* ACTIVE DELIVERIES */}

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

              Active Deliveries

            </h2>

            <p

              className="
                text-gray-500
                mb-6
                leading-relaxed
              "
            >

              View assigned food deliveries and pickup locations.

            </p>

            <Link
              to="/volunteer/deliveries"
            >

              <Button>

                Manage Deliveries

              </Button>

            </Link>

          </div>

          {/* DELIVERY STATUS */}

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

              Delivery Status

            </h2>

            <p

              className="
                text-gray-500
                mb-6
                leading-relaxed
              "
            >

              Track completed and pending deliveries in realtime.

            </p>

            <Link
              to="/volunteer/deliveries"
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