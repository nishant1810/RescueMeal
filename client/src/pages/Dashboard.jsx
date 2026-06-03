import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  useNotification,
} from "../context/NotificationContext";

import AnalyticsChart from "../components/AnalyticsChart";

import CategoryPieChart from "../components/CategoryPieChart";

import StatsCard from "../components/StatsCard";

import StatsCardSkeleton from "../components/StatsCardSkeleton";

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

  const { user } =
    useAuth();

  /*
  ========================================
  NOTIFICATIONS
  ========================================
  */

  const {
    addNotification,
  } = useNotification();

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
        setLoading(true);

        const data =
          await getDashboardStats();

        /*
        ========================================
        SAFE STATE UPDATE
        ========================================
        */

        setStats({
          totalDonations:
            data?.totalDonations ||
            0,

          availableFood:
            data?.availableFood ||
            0,

          claimedFood:
            data?.claimedFood ||
            0,

          deliveredFood:
            data?.deliveredFood ||
            0,

          pickedDeliveries:
            data?.pickedDeliveries ||
            0,
        });
      } catch (error) {
        console.log(error);

        /*
        ========================================
        SAFE FALLBACK
        ========================================
        */

        setStats({
          totalDonations: 0,

          availableFood: 0,

          claimedFood: 0,

          deliveredFood: 0,

          pickedDeliveries: 0,
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
    /*
    ========================================
    NEW DONATION
    ========================================
    */

    socket.on(
      "newFoodDonation",
      (data) => {
        fetchStats();

        addNotification(
          data?.message ||
            "New food donated",
          "success"
        );
      }
    );

    /*
    ========================================
    FOOD CLAIMED
    ========================================
    */

    socket.on(
      "foodClaimed",
      (data) => {
        fetchStats();

        addNotification(
          data?.message ||
            "Food claimed successfully",
          "info"
        );
      }
    );

    /*
    ========================================
    FOOD DELIVERED
    ========================================
    */

    socket.on(
      "foodDelivered",
      (data) => {
        fetchStats();

        addNotification(
          data?.message ||
            "Food delivered successfully",
          "success"
        );
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

      socket.off(
        "foodDelivered"
      );
    };
  }, []);

  /*
  ========================================
  LOADING UI
  ========================================
  */

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          p-6
        "
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <StatsCardSkeleton
                key={index}
              />
            ))}
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
            capitalize
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
            value={
              stats.totalDonations
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
              stats.pickedDeliveries
            }
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