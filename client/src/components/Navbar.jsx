import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  User,
  LogOut,
  Settings,
  ClipboardList,
  HeartHandshake,
  Truck,
  LayoutDashboard,
  Bell,
  PlusCircle,
  PackageCheck,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  /*
  ========================================
  AUTH
  ========================================
  */

  const { user, logout } =
    useAuth();

  /*
  ========================================
  NAVIGATION
  ========================================
  */

  const navigate =
    useNavigate();

  /*
  ========================================
  STATE
  ========================================
  */

  const [open, setOpen] =
    useState(false);

  const menuRef = useRef();

  /*
  ========================================
  CLOSE MENU
  ========================================
  */

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handler
      );
    };
  }, []);

  /*
  ========================================
  ROLE LABEL
  ========================================
  */

  const roleLabel =
    user?.role === "ngo"
      ? "NGO"
      : user?.role
          ?.charAt(0)
          .toUpperCase() +
        user?.role?.slice(1);

  return (
    <div
      className="
      bg-[#1f1f1f]
      border-b
      border-gray-800
      px-6
      py-4
      flex
      justify-between
      items-center
    "
    >
      {/* LEFT */}

      <div>
        <h1
          className="
          text-2xl
          font-bold
          text-white
        "
        >
          RescueMeal
        </h1>

        <p className="text-gray-400">
          Smart Food Rescue &
          Distribution Platform
        </p>
      </div>

      {/* RIGHT */}

      <div
        className="
        flex
        items-center
        gap-5
      "
      >
        {/* NOTIFICATION */}

        <Bell
          className="
          text-gray-300
          cursor-pointer
        "
        />

        {/* PROFILE */}

        <div
          className="relative"
          ref={menuRef}
        >
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
            w-11
            h-11
            rounded-full
            bg-gray-300
            flex
            items-center
            justify-center
          "
          >
            <User
              className="text-gray-700"
            />
          </button>

          {/* DROPDOWN */}

          {open && (
            <div
              className="
              absolute
              right-0
              mt-4
              w-[390px]
              bg-[#2a2a2a]
              rounded-3xl
              shadow-2xl
              p-6
              z-50
              text-white
            "
            >
              {/* USER */}

              <div
                className="
                flex
                items-center
                gap-5
                mb-8
              "
              >
                <div
                  className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-gray-200
                  flex
                  items-center
                  justify-center
                "
                >
                  <User
                    size={42}
                    className="text-gray-500"
                  />
                </div>

                <div>
                  <h2
                    className="
                    text-4xl
                    font-bold
                  "
                  >
                    {user?.username ||
                      user?.name}
                  </h2>

                  <p
                    className="
                    text-orange-400
                    text-lg
                    mt-2
                  "
                  >
                    {roleLabel} at
                    RescueMeal
                  </p>
                </div>
              </div>

              {/* QUICK ACTIONS */}

              <div
                className="
                grid
                grid-cols-3
                gap-4
                mb-8
              "
              >
                {/* DASHBOARD */}

                <button
                  onClick={() =>
                    navigate(
                      "/dashboard"
                    )
                  }
                  className="
                  bg-[#3a3a3a]
                  rounded-2xl
                  p-5
                  flex
                  flex-col
                  items-center
                  gap-3
                  hover:bg-[#454545]
                  transition
                "
                >
                  <LayoutDashboard
                    size={28}
                  />

                  <p className="text-lg">
                    Dashboard
                  </p>
                </button>

                {/* ROLE BASED */}

                {user?.role ===
                  "donor" && (
                  <button
                    onClick={() =>
                      navigate(
                        "/donate-food"
                      )
                    }
                    className="
                    bg-[#3a3a3a]
                    rounded-2xl
                    p-5
                    flex
                    flex-col
                    items-center
                    gap-3
                    hover:bg-[#454545]
                    transition
                  "
                  >
                    <PlusCircle
                      size={28}
                    />

                    <p className="text-lg">
                      Donate
                    </p>
                  </button>
                )}

                {user?.role ===
                  "ngo" && (
                  <button
                    onClick={() =>
                      navigate(
                        "/claimed-food"
                      )
                    }
                    className="
                    bg-[#3a3a3a]
                    rounded-2xl
                    p-5
                    flex
                    flex-col
                    items-center
                    gap-3
                    hover:bg-[#454545]
                    transition
                  "
                  >
                    <PackageCheck
                      size={28}
                    />

                    <p className="text-lg">
                      Claims
                    </p>
                  </button>
                )}

                {user?.role ===
                  "volunteer" && (
                  <button
                    onClick={() =>
                      navigate(
                        "/deliveries"
                      )
                    }
                    className="
                    bg-[#3a3a3a]
                    rounded-2xl
                    p-5
                    flex
                    flex-col
                    items-center
                    gap-3
                    hover:bg-[#454545]
                    transition
                  "
                  >
                    <Truck
                      size={28}
                    />

                    <p className="text-lg">
                      Delivery
                    </p>
                  </button>
                )}

                {/* DONATIONS */}

                <button
                  onClick={() =>
                    navigate(
                      "/my-donations"
                    )
                  }
                  className="
                  bg-[#3a3a3a]
                  rounded-2xl
                  p-5
                  flex
                  flex-col
                  items-center
                  gap-3
                  hover:bg-[#454545]
                  transition
                "
                >
                  <ClipboardList
                    size={28}
                  />

                  <p className="text-lg">
                    Donations
                  </p>
                </button>
              </div>

              {/* MENU */}

              <div className="space-y-6">
                {/* ROLE */}

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  text-lg
                  text-gray-300
                "
                >
                  <HeartHandshake
                    size={22}
                  />

                  Role:{" "}
                  {roleLabel}
                </div>

                {/* SETTINGS */}

                <button
                  className="
                  flex
                  items-center
                  gap-4
                  text-lg
                  text-gray-300
                  hover:text-white
                  transition
                  w-full
                "
                >
                  <Settings
                    size={22}
                  />

                  Settings
                </button>

                {/* LOGOUT */}

                <button
                  onClick={logout}
                  className="
                  flex
                  items-center
                  gap-4
                  text-lg
                  text-red-400
                  hover:text-red-300
                  transition
                  w-full
                "
                >
                  <LogOut
                    size={22}
                  />

                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;