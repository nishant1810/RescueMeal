import React,
{
  createContext,

  useContext,

  useEffect,

  useState,
} from "react";

/*
========================================
SOCKET
========================================
*/

import {
  useSocket,
} from "./SocketContext.jsx";

/*
========================================
CREATE CONTEXT
========================================
*/

const NotificationContext =
  createContext();

/*
========================================
PROVIDER
========================================
*/

export const NotificationProvider =
  ({ children }) => {

    /*
    ========================================
    SOCKET
    ========================================
    */

    const socket =
      useSocket();

    /*
    ========================================
    STATE
    ========================================
    */

    const [

      notifications,

      setNotifications,

    ] = useState([]);

    /*
    ========================================
    SOCKET EVENTS
    ========================================
    */

    useEffect(() => {

      if (!socket) return;

      /*
      ========================================
      FOOD ADDED
      ========================================
      */

      socket.on(

        "food:new",

        (food) => {

          const newNotification = {

            id: Date.now(),

            title:
              "New Food Donation",

            message:
              `${food.foodName} added`,

            type:
              "success",

            createdAt:
              new Date(),

            read: false,
          };

          setNotifications(
            (prev) => [

              newNotification,

              ...prev,
            ]
          );
        }
      );

      /*
      ========================================
      CLEANUP
      ========================================
      */

      return () => {

        socket.off(
          "food:new"
        );
      };

    }, [socket]);

    /*
    ========================================
    MARK READ
    ========================================
    */

    const markAsRead =
      (id) => {

        setNotifications(
          (prev) =>

            prev.map(
              (notification) =>

                notification.id === id

                  ? {

                      ...notification,

                      read: true,
                    }

                  : notification
            )
        );
      };

    /*
    ========================================
    CLEAR ALL
    ========================================
    */

    const clearNotifications =
      () => {

        setNotifications([]);
      };

    return (

      <NotificationContext.Provider

        value={{

          notifications,

          markAsRead,

          clearNotifications,
        }}
      >

        {children}

      </NotificationContext.Provider>
    );
  };

/*
========================================
USE NOTIFICATIONS
========================================
*/

export const useNotifications =
  () => {

    return useContext(
      NotificationContext
    );
  };