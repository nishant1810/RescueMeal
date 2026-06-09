import React from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  X,
} from "lucide-react";

/*
========================================
AUTH
========================================
*/

import {
  useAuth,
} from "../../context/AuthContext.jsx";

/*
========================================
NAVIGATION CONFIG
========================================
*/

import {
  navigationConfig,
} from "../../config/navigation.js";

/*
========================================
MOBILE SIDEBAR
========================================
*/

const MobileSidebar =
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
    USER LINKS
    ========================================
    */

    const links =

      navigationConfig[
        user?.role
      ] || [];

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
              shadow-lg
            `

            : `
              text-gray-300
              hover:bg-white/10
              hover:text-orange-400
            `
        }
      `;

    return (

      <>
        {/* ========================================
            OVERLAY
        ======================================== */}

        {sidebarOpen && (

          <div

            onClick={() =>
              setSidebarOpen?.(
                false
              )
            }

            className="

              fixed
              inset-0

              bg-black/60

              backdrop-blur-sm

              z-40

              lg:hidden
            "
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

            h-screen
            w-72

            bg-[#0f172a]

            border-r
            border-white/10

            shadow-2xl

            transition-transform
            duration-300

            lg:hidden

            flex
            flex-col

            ${

              sidebarOpen

                ? "translate-x-0"

                : "-translate-x-full"
            }
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

              px-6
              py-5

              border-b
              border-white/10
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

            {/* CLOSE BUTTON */}

            <button

              onClick={() =>
                setSidebarOpen?.(
                  false
                )
              }

              className="

                text-gray-300

                hover:text-orange-400

                transition
              "
            >

              <X size={24} />

            </button>

          </div>

          {/* ========================================
              NAVIGATION
          ======================================== */}

          <nav

            className="

              flex-1

              px-4
              py-6

              space-y-2

              overflow-y-auto
            "
          >

            {links.map(
              (item) => {

                const Icon =
                  item.icon;

                return (

                  <Link

                    key={item.path}

                    to={item.path}

                    onClick={() =>
                      setSidebarOpen?.(
                        false
                      )
                    }

                    className={linkStyles(
                      item.path
                    )}
                  >

                    <Icon
                      size={20}
                    />

                    <span>

                      {item.label}

                    </span>

                  </Link>
                );
              }
            )}

          </nav>

          {/* ========================================
              FOOTER
          ======================================== */}

          <div

            className="

              px-6
              py-4

              border-t
              border-white/10

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

export default MobileSidebar;