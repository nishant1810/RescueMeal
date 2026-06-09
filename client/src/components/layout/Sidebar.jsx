import React from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {

  X,

  LayoutDashboard,

  HeartHandshake,

  Package,

  Utensils,

  CheckCircle,

  Truck,

  Shield,

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
ROLES
========================================
*/

import {
  ROLES,
} from "../../constants/roles.js";

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
    LOCATION
    ========================================
    */

    const location =
      useLocation();

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
    ACTIVE LINK
    ========================================
    */

    const isActive =
      (path) => {

        return (
          location.pathname === path
        );
      };

    /*
    ========================================
    LINK STYLES
    ========================================
    */

    const linkStyles =
      (path) => `

        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200
        font-medium

        ${
          isActive(path)

            ? `
              bg-orange-500
              text-white
              shadow-md
            `

            : `
              text-gray-300
              hover:bg-gray-800
              hover:text-white
            `
        }
      `;

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
            "/donor/dashboard",

          icon:
            <LayoutDashboard size={20} />,
        },

        {
          label:
            "Donate Food",

          path:
            "/donor/donate-food",

          icon:
            <HeartHandshake size={20} />,
        },

        {
          label:
            "My Donations",

          path:
            "/donor/my-donations",

          icon:
            <Package size={20} />,
        },
      ],

      [ROLES.NGO]: [

        {
          label:
            "Dashboard",

          path:
            "/ngo/dashboard",

          icon:
            <LayoutDashboard size={20} />,
        },

        {
          label:
            "Available Food",

          path:
            "/ngo/available-food",

          icon:
            <Utensils size={20} />,
        },

        {
          label:
            "Claimed Food",

          path:
            "/ngo/claimed-food",

          icon:
            <CheckCircle size={20} />,
        },
      ],

      [ROLES.VOLUNTEER]: [

        {
          label:
            "Dashboard",

          path:
            "/volunteer/dashboard",

          icon:
            <LayoutDashboard size={20} />,
        },

        {
          label:
            "Deliveries",

          path:
            "/volunteer/deliveries",

          icon:
            <Truck size={20} />,
        },
      ],

      [ROLES.ADMIN]: [

        {
          label:
            "Dashboard",

          path:
            "/admin/dashboard",

          icon:
            <LayoutDashboard size={20} />,
        },

        {
          label:
            "Admin Panel",

          path:
            "/admin/dashboard",

          icon:
            <Shield size={20} />,
        },
      ],
    };

    /*
    ========================================
    USER LINKS
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
              backdrop-blur-sm
              z-40
              lg:hidden
            "

            onClick={() =>
              setSidebarOpen(false)
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
            w-72
            h-screen
            bg-gray-900
            text-white
            shadow-2xl
            flex
            flex-col
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

          {/* HEADER */}

          <div

            className="
              flex
              items-center
              justify-between
              px-6
              py-6
              border-b
              border-gray-800
            "
          >

            <div>

              <h1

                className="
                  text-3xl
                  font-extrabold
                  text-orange-500
                "
              >

                RescueMeal

              </h1>

              <p

                className="
                  text-sm
                  text-gray-400
                  mt-1
                "
              >

                Food Rescue Platform

              </p>

            </div>

            <button

              className="lg:hidden"

              onClick={() =>
                setSidebarOpen(false)
              }
            >

              <X size={24} />

            </button>

          </div>


          {/* NAVIGATION */}

          <nav

            className="
              flex-1
              overflow-y-auto
              px-4
              py-6
              space-y-2
            "
          >

            {links.map(
              (item) => (

                <Link

                  key={item.path}

                  to={item.path}

                  onClick={() =>
                    setSidebarOpen(false)
                  }

                  className={linkStyles(
                    item.path
                  )}
                >

                  {item.icon}

                  <span>

                    {item.label}

                  </span>

                </Link>
              )
            )}

          </nav>

          {/* FOOTER */}

          <div

            className="
              p-6
              border-t
              border-gray-800
              text-sm
              text-gray-400
            "
          >

            © 2026 RescueMeal

          </div>

        </aside>

      </>
    );
  };

export default Sidebar;