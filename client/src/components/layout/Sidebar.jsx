import React
from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  X,
} from "lucide-react";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  ROLES,
} from "../../constants/roles";

/*
========================================
SIDEBAR
========================================
*/

const Sidebar =
  ({
    sidebarOpen,

    setSidebarOpen,
  }) => {

    /*
    ========================================
    AUTH
    ========================================
    */

    const { user } =
      useAuth();

    /*
    ========================================
    LOCATION
    ========================================
    */

    const location =
      useLocation();

    /*
    ========================================
    MENU ITEMS
    ========================================
    */

    const menuItems = {

      [ROLES.DONOR]: [

        {
          label:
            "Dashboard",

          path:
            "/dashboard",
        },

        {
          label:
            "Donate Food",

          path:
            "/donate-food",
        },

        {
          label:
            "My Donations",

          path:
            "/my-donations",
        },
      ],

      [ROLES.NGO]: [

        {
          label:
            "Dashboard",

          path:
            "/dashboard",
        },

        {
          label:
            "Available Food",

          path:
            "/available-food",
        },

        {
          label:
            "Claimed Food",

          path:
            "/claimed-food",
        },
      ],

      [ROLES.VOLUNTEER]: [

        {
          label:
            "Dashboard",

          path:
            "/dashboard",
        },

        {
          label:
            "Deliveries",

          path:
            "/deliveries",
        },
      ],

      [ROLES.ADMIN]: [

        {
          label:
            "Dashboard",

          path:
            "/dashboard",
        },

        {
          label:
            "Admin Panel",

          path:
            "/admin",
        },
      ],
    };

    /*
    ========================================
    CURRENT USER LINKS
    ========================================
    */

    const links =
      menuItems[
        user?.role
      ] || [];

    return (

      <>

        {/* ========================================
            MOBILE OVERLAY
        ======================================== */}

        {sidebarOpen && (

          <div

            className="

              fixed

              inset-0

              bg-black/50

              z-40

              lg:hidden
            "

            onClick={() =>
              setSidebarOpen(
                false
              )
            }
          />
        )}

        {/* ========================================
            SIDEBAR
        ======================================== */}

        <aside

          className={`

            fixed

            top-0

            left-0

            z-50

            w-64

            h-screen

            bg-gray-900

            text-white

            p-6

            shadow-xl

            transform

            transition-transform

            duration-300

            ${

              sidebarOpen

                ? "translate-x-0"

                : "-translate-x-full"
            }

            lg:translate-x-0
          `}
        >

          {/* ========================================
              HEADER
          ======================================== */}

          <div

            className="

              flex

              items-center

              justify-between

              mb-10
            "
          >

            <h1

              className="

                text-3xl

                font-bold

                text-orange-500
              "
            >

              RescueMeal

            </h1>

            {/* ========================================
                CLOSE BUTTON
            ======================================== */}

            <button

              className="lg:hidden"

              onClick={() =>
                setSidebarOpen(
                  false
                )
              }
            >

              <X size={24} />

            </button>

          </div>

          {/* ========================================
              NAVIGATION LINKS
          ======================================== */}

          <nav

            className="space-y-3"
          >

            {links.map(
              (item) => (

                <Link

                  key={item.path}

                  to={item.path}

                  onClick={() =>
                    setSidebarOpen(
                      false
                    )
                  }

                  className={`

                    block

                    px-4

                    py-3

                    rounded-lg

                    transition

                    duration-200

                    font-medium

                    ${

                      location.pathname ===
                      item.path

                        ? "bg-green-500 text-white"

                        : "hover:bg-gray-800"
                    }
                  `}
                >

                  {item.label}

                </Link>
              )
            )}

          </nav>

        </aside>

      </>
    );
  };

export default
Sidebar;