import React from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Navbar = () => {

  /*
  ========================================
  NAVIGATION
  ========================================
  */

  const navigate =
    useNavigate();

  const location =
    useLocation();

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

  /*
  ========================================
  ACTIVE LINK
  ========================================
  */

  const activeLink =
    (path) => {

      return location.pathname === path
        ? `
          text-orange-500
          font-semibold
        `
        : `
          text-gray-700
          hover:text-orange-500
        `;
    };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-white
        shadow-md
      "
    >
      {/* ========================================
          CONTAINER
      ======================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          py-4
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
            text-3xl
            font-extrabold
            tracking-tight
            text-orange-500
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
            items-center
            gap-6
          "
        >
          {/* DASHBOARD */}

          <Link
            to="/dashboard"

            className={`
              transition-all
              duration-200
              ${activeLink(
                "/dashboard"
              )}
            `}
          >
            Dashboard
          </Link>

          {/* ========================================
              DONOR LINKS
          ======================================== */}

          {
            role === "donor" && (
              <>
                <Link
                  to="/donate-food"

                  className={`
                    transition-all
                    duration-200
                    ${activeLink(
                      "/donate-food"
                    )}
                  `}
                >
                  Donate
                </Link>

                <Link
                  to="/my-donations"

                  className={`
                    transition-all
                    duration-200
                    ${activeLink(
                      "/my-donations"
                    )}
                  `}
                >
                  Donations
                </Link>
              </>
            )
          }

          {/* ========================================
              NGO LINKS
          ======================================== */}

          {
            role === "ngo" && (
              <>
                <Link
                  to="/available-food"

                  className={`
                    transition-all
                    duration-200
                    ${activeLink(
                      "/available-food"
                    )}
                  `}
                >
                  Food
                </Link>

                <Link
                  to="/claimed-food"

                  className={`
                    transition-all
                    duration-200
                    ${activeLink(
                      "/claimed-food"
                    )}
                  `}
                >
                  Claimed
                </Link>
              </>
            )
          }

          {/* ========================================
              VOLUNTEER LINKS
          ======================================== */}

          {
            role ===
              "volunteer" && (

              <Link
                to="/deliveries"

                className={`
                  transition-all
                  duration-200
                  ${activeLink(
                    "/deliveries"
                  )}
                `}
              >
                Deliveries
              </Link>
            )
          }

          {/* ========================================
              ROLE BADGE
          ======================================== */}

          <div
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              uppercase
              tracking-wide
              ${
                role === "ngo"
                  ? `
                    bg-green-100
                    text-green-700
                  `
                  : role ===
                    "donor"
                  ? `
                    bg-blue-100
                    text-blue-700
                  `
                  : `
                    bg-purple-100
                    text-purple-700
                  `
              }
            `}
          >
            {role}
          </div>

          {/* ========================================
              LOGOUT BUTTON
          ======================================== */}

          <button
            onClick={
              handleLogout
            }

            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-5
              py-2
              rounded-xl
              font-medium
              transition-all
              duration-200
              shadow-sm
            "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;