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
  const { user } = useAuth();

  /*
  ========================================
  SAFE INITIAL STATE
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
  FETCH STATS
  ========================================
  */

  const fetchStats =
    async () => {
      try {
        const data =
          await getDashboardStats();

        /*
        ========================================
        SAFE FALLBACK
        ========================================
        */

        setStats({
          totalFood:
            data?.totalFood || 0,

          availableFood:
            data?.availableFood ||
            0,

          claimedFood:
            data?.claimedFood || 0,

          deliveredFood:
            data?.deliveredFood ||
            0,

          pickedFood:
            data?.pickedFood || 0,
        });
      } catch (error) {
        console.log(error);

        /*
        ========================================
        PREVENT CRASH
        ========================================
        */

        setStats({
          totalFood: 0,
          availableFood: 0,
          claimedFood: 0,
          deliveredFood: 0,
          pickedFood: 0,
        });
      } finally {
        setLoading(false);
      }
    };

  /*
  ========================================
  INITIAL LOAD
  ========================================
  */

  useEffect(() => {
    fetchStats();
  }, []);

  /*
  ========================================
  SOCKET EVENTS
  ========================================
  */

  useEffect(() => {
    socket.on(
      "newFoodDonation",
      fetchStats
    );

    socket.on(
      "foodClaimed",
      fetchStats
    );

    return () => {
      socket.off(
        "newFoodDonation",
        fetchStats
      );

      socket.off(
        "foodClaimed",
        fetchStats
      );
    };
  }, []);

  /*
  ========================================
  LOADING
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
        "
        >
          <h1
            className="
            text-3xl
            font-bold
          "
          >
            Loading...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="
        min-h-screen
        bg-gray-100
        p-4
        md:p-6
      "
      >
        {/* HEADER */}

        <div className="mb-10">
          <h1
            className="
            text-4xl
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
            {user?.role}
          </p>
        </div>

        {/* STATS */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
        >
          <StatsCard
            title="Total Donations"
            value={stats.totalFood}
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
            value={stats.pickedFood}
          />
        </div>

        {/* CHARTS */}

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mt-10
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
    </DashboardLayout>
  );
};

export default Dashboard;