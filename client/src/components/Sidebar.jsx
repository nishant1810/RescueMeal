import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div
      className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-6
      hidden
      md:block
    "
    >
      {/* LOGO */}

      <h1
        className="
        text-3xl
        font-bold
        mb-10
        text-orange-500
      "
      >
        RescueMeal
      </h1>

      {/* LINKS */}

      <div className="space-y-4">
        {/* DASHBOARD */}

        <Link
          to="/dashboard"
          className="
          block
          hover:text-green-400
          transition
        "
        >
          Dashboard
        </Link>

        {/* DONOR LINKS */}

        {user?.role === "donor" && (
          <>
            <Link
              to="/donate-food"
              className="
              block
              hover:text-green-400
              transition
            "
            >
              Donate Food
            </Link>

            <Link
              to="/my-donations"
              className="
              block
              hover:text-green-400
              transition
            "
            >
              My Donations
            </Link>
          </>
        )}

        {/* NGO LINKS */}

        {user?.role === "ngo" && (
          <>
            <Link
              to="/available-food"
              className="
              block
              hover:text-green-400
              transition
            "
            >
              Available Food
            </Link>

            <Link
              to="/claimed-food"
              className="
              block
              hover:text-green-400
              transition
            "
            >
              Claimed Food
            </Link>
          </>
        )}

        {/* VOLUNTEER */}

        {user?.role ===
          "volunteer" && (
          <Link
            to="/deliveries"
            className="
            block
            hover:text-green-400
            transition
          "
          >
            Deliveries
          </Link>
        )}

        {/* ADMIN */}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="
            block
            hover:text-green-400
            transition
          "
          >
            Admin Panel
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;