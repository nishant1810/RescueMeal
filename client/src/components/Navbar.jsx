import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {

  const navigate =
    useNavigate();

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
  LOGOUT
  ========================================
  */

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/login");
    };

  return (
    <nav
      className="
        bg-gray-900
        text-white
        px-6
        py-4
        shadow-lg
        flex
        justify-between
        items-center
      "
    >
      {/* ========================================
          LOGO
      ======================================== */}

      <Link
        to="/dashboard"
        className="
          text-2xl
          font-bold
        "
      >
        RescueMeal
      </Link>

      {/* ========================================
          NAV LINKS
      ======================================== */}

      <div
        className="
          flex
          gap-6
          items-center
        "
      >
        {/* DASHBOARD */}

        <Link
          to="/dashboard"
          className="
            hover:text-gray-200
          "
        >
          Dashboard
        </Link>

        {/* ========================================
            DONOR NAVBAR
        ======================================== */}

        {role ===
          "donor" && (
          <>
            <Link
              to="/donate-food"
              className="
                hover:text-gray-200
              "
            >
              Donate
            </Link>

            <Link
              to="/my-donations"
              className="
                hover:text-gray-200
              "
            >
              Donations
            </Link>
          </>
        )}

        {/* ========================================
            NGO NAVBAR
        ======================================== */}

        {role ===
          "ngo" && (
          <>
            <Link
              to="/available-food"
              className="
                hover:text-gray-200
              "
            >
              Food
            </Link>

            <Link
              to="/claimed-food"
              className="
                hover:text-gray-200
              "
            >
              Claimed
            </Link>
          </>
        )}

        {/* ========================================
            VOLUNTEER NAVBAR
        ======================================== */}

        {role ===
          "volunteer" && (
          <Link
            to="/deliveries"
            className="
              hover:text-gray-200
            "
          >
            Deliveries
          </Link>
        )}

        {/* ========================================
            LOGOUT
        ======================================== */}

        <button
          onClick={
            handleLogout
          }

          className="
            bg-red-500
            px-4
            py-2
            rounded-lg
            hover:bg-red-600
          "
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;