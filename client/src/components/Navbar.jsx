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
  Search,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useNotification,
} from "../context/NotificationContext";

import toast from "react-hot-toast";

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
  NOTIFICATIONS
  ========================================
  */

  const {
    notifications,
    removeNotification,
  } = useNotification();

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

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  const [search, setSearch] =
    useState("");

  /*
  ========================================
  REFS
  ========================================
  */

  const menuRef =
    useRef();

  const notificationRef =
    useRef();

  /*
  ========================================
  CLOSE MENU OUTSIDE CLICK
  ========================================
  */

  useEffect(() => {
    const handler = (e) => {
      /*
      ========================================
      PROFILE MENU
      ========================================
      */

      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }

      /*
      ========================================
      NOTIFICATION PANEL
      ========================================
      */

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          e.target
        )
      ) {
        setNotificationOpen(
          false
        );
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

  /*
  ========================================
  HANDLE SEARCH
  ========================================
  */

  const handleSearch = (
    e
  ) => {
    if (
      e.key === "Enter"
    ) {
      if (
        search.trim() === ""
      ) {
        return toast.error(
          "Enter something to search"
        );
      }

      toast.success(
        `Searching for "${search}"`
      );

      navigate(
        `/available-food?search=${search}`
      );
    }
  };

  /*
  ========================================
  HANDLE LOGOUT
  ========================================
  */

  const handleLogout =
    () => {
      logout();

      toast.success(
        "Logged out successfully"
      );

      navigate("/login");
    };

  return (
    <div
      className="
      bg-[#1f1f1f]
      border-b
      border-gray-800
      px-4
      md:px-6
      py-4
      flex
      justify-between
      items-center
      gap-4
      relative
    "
    >
      {/* LEFT */}

      <div>
        <h1
          className="
          text-2xl
          md:text-3xl
          font-bold
          text-white
        "
        >
          RescueMeal
        </h1>

        <p
          className="
          text-gray-400
          hidden
          md:block
        "
        >
          Smart Food Rescue &
          Distribution Platform
        </p>
      </div>

      {/* RIGHT */}

      <div
        className="
        flex
        items-center
        gap-4
      "
      >
        {/* SEARCH */}

        <div
          className="
          hidden
          md:flex
          items-center
          bg-[#2c2c2c]
          px-4
          py-2
          rounded-xl
          w-[320px]
        "
        >
          <Search
            size={18}
            className="
            text-gray-400
          "
          />

          <input
            type="text"
            placeholder="Search food, NGOs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            onKeyDown={
              handleSearch
            }
            className="
            bg-transparent
            outline-none
            px-3
            text-white
            w-full
            placeholder:text-gray-500
          "
          />
        </div>

        {/* NOTIFICATION */}

        <div
          className="relative"
          ref={
            notificationRef
          }
        >
          <button
            onClick={() =>
              setNotificationOpen(
                !notificationOpen
              )
            }
            className="
            relative
            text-gray-300
            hover:text-white
            transition
          "
          >
            <Bell size={24} />

            {/* BADGE */}

            {notifications.length >
              0 && (
              <span
                className="
                absolute
                -top-1
                -right-1
                bg-red-500
                text-white
                text-xs
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
              "
              >
                {
                  notifications.length
                }
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}

          {notificationOpen && (
            <div
              className="
              absolute
              right-0
              mt-4
              w-[340px]
              bg-[#2a2a2a]
              rounded-2xl
              shadow-2xl
              p-4
              z-50
              border
              border-gray-700
            "
            >
              <h2
                className="
                text-white
                text-xl
                font-bold
                mb-4
              "
              >
                Notifications
              </h2>

              {notifications.length ===
              0 ? (
                <p
                  className="
                  text-gray-400
                "
                >
                  No notifications
                </p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {notifications.map(
                    (
                      notification
                    ) => (
                      <div
                        key={
                          notification.id
                        }
                        className="
                        bg-[#3a3a3a]
                        p-3
                        rounded-xl
                        flex
                        justify-between
                        items-start
                        gap-3
                      "
                      >
                        <div>
                          <p
                            className="
                            text-white
                            text-sm
                          "
                          >
                            {
                              notification.message
                            }
                          </p>

                          <span
                            className="
                            text-xs
                            text-gray-400
                          "
                          >
                            {new Date(
                              notification.createdAt
                            ).toLocaleTimeString()}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            removeNotification(
                              notification.id
                            )
                          }
                          className="
                          text-red-400
                          hover:text-red-300
                        "
                        >
                          <X
                            size={16}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* PROFILE */}

        <div
          className="relative"
          ref={menuRef}
        >
          {/* PROFILE BUTTON */}

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
            hover:scale-105
            transition
          "
          >
            <User
              className="
              text-gray-700
            "
            />
          </button>

          {/* PROFILE DROPDOWN */}

          {open && (
            <div
              className="
              absolute
              right-0
              mt-4
              w-[360px]
              md:w-[390px]
              bg-[#2a2a2a]
              rounded-3xl
              shadow-2xl
              p-6
              z-50
              text-white
              border
              border-gray-700
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
                    className="
                    text-gray-500
                  "
                  />
                </div>

                <div>
                  <h2
                    className="
                    text-3xl
                    md:text-4xl
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

                  <p className="text-sm md:text-lg">
                    Dashboard
                  </p>
                </button>

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

                    <p className="text-sm md:text-lg">
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

                    <p className="text-sm md:text-lg">
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

                    <p className="text-sm md:text-lg">
                      Delivery
                    </p>
                  </button>
                )}

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

                  <p className="text-sm md:text-lg">
                    Donations
                  </p>
                </button>
              </div>

              {/* MENU */}

              <div className="space-y-5">
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

                  Role:
                  {" "}
                  {roleLabel}
                </div>

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

                <button
                  onClick={
                    handleLogout
                  }
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