import React
from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  LogOut,
} from "lucide-react";

import {
  useAuth,
} from "../../context/AuthContext";

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
    AUTH CONTEXT
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
    LOGOUT HANDLER
    ========================================
    */

    const handleLogout =
      () => {

        /*
        ========================================
        CONTEXT LOGOUT
        ========================================
        */

        if (logout) {

          logout();
        }

        /*
        ========================================
        FALLBACK
        ========================================
        */

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

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

          bg-white

          shadow-sm

          border-b

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
            "

            onClick={() =>
              setSidebarOpen(
                true
              )
            }
          >

            <Menu size={24} />

          </button>

          {/* PAGE TITLE */}

          <div>

            <h1

              className="

                text-2xl

                font-bold

                text-gray-800
              "
            >

              Dashboard

            </h1>

            <p

              className="

                text-sm

                text-gray-500
              "
            >

              Welcome back,
              {" "}
              {user?.name}
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

            {role}

          </div>

          {/* USER NAME */}

          <div

            className="

              hidden

              sm:block
            "
          >

            <p

              className="

                font-medium

                text-gray-800
              "
            >

              {user?.name}

            </p>

            <p

              className="

                text-sm

                text-gray-500
              "
            >

              {user?.email}

            </p>

          </div>

          {/* LOGOUT BUTTON */}

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

              py-2

              rounded-lg

              transition

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

export default
Navbar;