import React
from "react";

import {
  Bell,
} from "lucide-react";

/*
========================================
NOTIFICATIONS
========================================
*/

import {
  useNotifications,
} from "../../context/NotificationContext.jsx";

/*
========================================
NOTIFICATION BELL
========================================
*/

const NotificationBell =
  ({ onClick }) => {

    /*
    ========================================
    CONTEXT
    ========================================
    */

    const {
      notifications,
    } = useNotifications();

    /*
    ========================================
    UNREAD COUNT
    ========================================
    */

    const unreadCount =

      notifications.filter(
        (notification) =>

          !notification.read
      ).length;

    return (

      <button

        onClick={onClick}

        className="

          relative

          p-2

          rounded-full

          hover:bg-slate-100

          transition-all
        "
      >

        <Bell
          size={24}
        />

        {/* BADGE */}

        {unreadCount > 0 && (

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

            {unreadCount}

          </span>
        )}

      </button>
    );
  };

export default
NotificationBell;