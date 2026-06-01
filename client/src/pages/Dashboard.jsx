import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import AnalyticsChart from "../components/AnalyticsChart";

import CategoryPieChart from "../components/CategoryPieChart";

import StatsCard from "../components/StatsCard";

import socket from "../socket";

import {
  getDashboardStats,
} from "../services/foodService";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  /*
  ========================================
  AUTH
  ========================================
  */

  const { user } = useAuth();

  /*
  ========================================
  STATE
  ========================================
  */

  const [stats, setStats] =
    useState({
      totalFood: 0,
      availableFood: 0,
      claimedFood: 0,
      deliveredFood: 0,
      pickedFood: 0,
    });

  const [loading, setLoading] =
    useState(true);

  /*
  ========================================
  FETCH DASHBOARD STATS
  ========================================
  */

  const fetchStats =
    async () => {
      try {
        const data =
          await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  /*
  ========================================
  INITIAL FETCH
  ========================================
  */

  useEffect(() => {
    fetchStats();
  }, []);

  /*
  ========================================
  REAL-TIME SOCKET EVENTS
  ========================================
  */

  useEffect(() => {
    /*
    ========================================
    NEW DONATION
    ========================================
    */

    socket.on(
      "newFoodDonation",
      () => {
        fetchStats();
      }
    );

    /*
    ========================================
    FOOD CLAIMED
    ========================================
    */

    socket.on(
      "foodClaimed",
      () => {
        fetchStats();
      }
    );

    /*
    ========================================
    CLEANUP
    ========================================
    */

    return () => {
      socket.off(
        "newFoodDonation"
      );

      socket.off(
        "foodClaimed"
      );
    };
  }, []);

  /*
  ========================================
  LOADING STATE
  ========================================
  */

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-100
        "
        >
          <div
            className="
            text-center
          "
          >
            <div
              className="
              w-14
              h-14
              border-4
              border-green-500
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
            />

            <h1
              className="
              text-2xl
              font-bold
            "
            >
              Loading Dashboard...
            </h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /*
  ========================================
  MAIN UI
  ========================================
  */

  return (
    <DashboardLayout>
      <div
        className="
        min-h-screen
        bg-gray-100
        p-4
        md:p-6
        overflow-x-hidden
      "
      >
        {/* CONTAINER */}

        <div
          className="
          max-w-7xl
          mx-auto
        "
        >
          {/* HEADER */}

          <div className="mb-8">
            <h1
              className="
              text-3xl
              md:text-5xl
              font-bold
              mb-2
            "
            >
              Welcome,
              {" "}
              {user?.name}
            </h1>

            <p
              className="
              text-gray-500
              text-lg
            "
            >
              Role:
              {" "}
              {user?.role ===
              "ngo"
                ? "NGO"
                : user?.role
                    ?.charAt(0)
                    .toUpperCase() +
                  user?.role?.slice(
                    1
                  )}
            </p>
          </div>

          {/* STATS */}

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
          >
            <StatsCard
              title="Total Donations"
              value={
                stats.totalFood
              }
            />

            <StatsCard
              title="Available Food"
              value={
                stats.availableFood
              }
            />

            <StatsCard
              title="Claimed Food"
              value={
                stats.claimedFood
              }
            />

            <StatsCard
              title="Delivered Food"
              value={
                stats.deliveredFood
              }
            />

            <StatsCard
              title="Picked Deliveries"
              value={
                stats.pickedFood
              }
            />
          </div>

          {/* CHARTS */}

          <div
            className="
            grid
            grid-cols-1
            2xl:grid-cols-2
            gap-6
            mt-6
          "
          >
            <AnalyticsChart
              stats={stats}
            />

            <CategoryPieChart
              stats={stats}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;