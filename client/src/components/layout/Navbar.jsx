import React from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Menu,

  LogOut,
} from "lucide-react";

/*
========================================
AUTH CONTEXT
========================================
*/

import {
  useAuth,
} from "../../context/AuthContext.jsx";

/*
========================================
UTILS
========================================
*/

import getDashboardRoute from "../../utils/getDashboardRoute.js";
/*
========================================
NAVBAR
========================================
*/

const Navbar =
  ({
    setSidebarOpen,
  }) => {

    /*
    ========================================
    NAVIGATION
    ========================================
    */

    const navigate =
      useNavigate();

    /*
    ========================================
    AUTH
    ========================================
    */

    const {

      user,

      logout,
    } = useAuth();

    /*
    ========================================
    ROLE
    ========================================
    */

    const role =
      user?.role;

    /*
    ========================================
    DASHBOARD ROUTE
    ========================================
    */

    const dashboardRoute =

      getDashboardRoute(
        role
      );

    /*
    ========================================
    LOGOUT
    ========================================
    */

    const handleLogout =
      () => {

        /*
        ========================================
        AUTH LOGOUT
        ========================================
        */

        logout();

        /*
        ========================================
        REDIRECT
        ========================================
        */

        navigate(
          "/login"
        );
      };

    /*
    ========================================
    ROLE BADGE STYLES
    ========================================
    */

    const roleStyles = {

      donor:
        "bg-blue-100 text-blue-700",

      ngo:
        "bg-green-100 text-green-700",

      volunteer:
        "bg-purple-100 text-purple-700",

      admin:
        "bg-red-100 text-red-700",
    };

    return (

      <header

        className="

          sticky

          top-0

          z-30

          bg-white/95

          backdrop-blur-md

          border-b

          border-gray-200

          px-4

          md:px-6

          py-4

          flex

          items-center

          justify-between
        "
      >

        {/* ========================================
            LEFT SECTION
        ======================================== */}

        <div

          className="

            flex

            items-center

            gap-4
          "
        >

          {/* MOBILE MENU */}

          <button

            className="

              lg:hidden

              text-gray-700

              hover:text-orange-500

              transition
            "

            onClick={() =>
              setSidebarOpen?.(
                true
              )
            }
          >

            <Menu size={24} />

          </button>

          {/* BRAND */}

          <div>

            <h1

              onClick={() =>
                navigate(
                  dashboardRoute
                )
              }

              className="

                text-3xl

                font-extrabold

                tracking-tight

                text-orange-500

                cursor-pointer

                select-none
              "
            >

              RescueMeal

            </h1>

            <p

              className="

                text-sm

                text-gray-500

                mt-1
              "
            >

              Welcome back,

              {" "}

              <span
                className="font-medium"
              >

                {
                  user?.name ||
                  "User"
                }

              </span>

            </p>

          </div>

        </div>

        {/* ========================================
            RIGHT SECTION
        ======================================== */}

        <div

          className="

            flex

            items-center

            gap-4
          "
        >

          {/* ROLE BADGE */}

          <div

            className={`

              hidden

              md:flex

              items-center

              px-3

              py-1

              rounded-full

              text-xs

              font-semibold

              uppercase

              tracking-wide

              ${

                roleStyles[
                  role
                ] ||

                "bg-gray-100 text-gray-700"
              }
            `}
          >

            {role || "user"}

          </div>

          {/* LOGOUT */}

          <button

            onClick={
              handleLogout
            }

            className="

              flex

              items-center

              gap-2

              bg-orange-500

              hover:bg-orange-600

              text-white

              px-4

              py-2.5

              rounded-xl

              shadow-sm

              transition-all

              duration-200
            "
          >

            <LogOut size={18} />

            <span
              className="hidden sm:block"
            >

              Logout

            </span>

          </button>

        </div>

      </header>
    );
  };

export default Navbar;