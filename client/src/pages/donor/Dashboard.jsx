import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  Package,
  CheckCircle,
  Truck,
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
AUTH
========================================
*/

import {
  useAuth,
} from "../../context/AuthContext";

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
from "../../components/ui/Loader.jsx";

import PageHeader
from "../../components/ui/PageHeader.jsx";

import Button
from "../../components/ui/Button.jsx";

/*
========================================
DASHBOARD COMPONENTS
========================================
*/

import StatsCard
from "../../components/dashboard/StatsCard.jsx";

import DashboardGrid
from "../../components/dashboard/DashboardGrid.jsx";

import SectionCard
from "../../components/dashboard/SectionCard.jsx";

import AnalyticsChart
from "../../components/dashboard/AnalyticsChart.jsx";

/*
========================================
DASHBOARD
========================================
*/

const Dashboard = () => {

  /*
  ========================================
  AUTH
  ========================================
  */

  const {
    user,
  } = useAuth();

  /*
  ========================================
  DASHBOARD QUERY
  ========================================
  */

  const {
    data: stats,
    isLoading,
    error,
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
          text="Loading dashboard..."
        />

      </DashboardLayout>
    );
  }

  /*
  ========================================
  ERROR
  ========================================
  */

  if (error) {

    return (

      <DashboardLayout>

        <div

          className="
            flex
            items-center
            justify-center
            min-h-[400px]
          "
        >

          <div className="text-center">

            <h2

              className="
                text-3xl
                font-bold
                text-red-500
              "
            >

              Failed to load dashboard

            </h2>

            <p

              className="
                text-gray-500
                mt-2
              "
            >

              Please try again later.

            </p>

          </div>

        </div>

      </DashboardLayout>
    );
  }

  /*
  ========================================
  CHART DATA
  ========================================
  */

  const chartData = [

    {
      name: "Claimed",
      value:
        stats?.claimedFood || 0,
    },

    {
      name: "Delivered",
      value:
        stats?.deliveredFood || 0,
    },
  ];

  /*
  ========================================
  CHECK DATA
  ========================================
  */

  const hasAnalyticsData =

    (stats?.claimedFood || 0) > 0 ||

    (stats?.deliveredFood || 0) > 0;

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

          title={`Welcome back, ${user?.name}`}

          description="Track your food donations and impact."

          action={

            <Link
              to="/donor/donate-food"
            >

              <Button>

                Donate Food

              </Button>

            </Link>
          }
        />

        {/* ========================================
            STATS GRID
        ======================================== */}

        <DashboardGrid>

          <StatsCard

            title="My Donations"

            value={
              stats?.totalDonations || 0
            }

            icon={
              <Package size={30} />
            }

            color="bg-blue-500"
          />

          <StatsCard

            title="Claimed Donations"

            value={
              stats?.claimedFood || 0
            }

            icon={
              <CheckCircle size={30} />
            }

            color="bg-yellow-500"
          />

          <StatsCard

            title="Delivered Donations"

            value={
              stats?.deliveredFood || 0
            }

            icon={
              <Truck size={30} />
            }

            color="bg-purple-500"
          />

        </DashboardGrid>

        {/* ========================================
            ANALYTICS SECTION
        ======================================== */}

        <SectionCard
          title="Donation Analytics"
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

                Start donating food to track analytics.

              </p>

            </div>
          )}

        </SectionCard>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;