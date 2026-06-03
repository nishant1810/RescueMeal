import React, {
  createContext,
  useContext,
  useState,
} from "react";

const NotificationContext =
  createContext();

export const NotificationProvider =
  ({ children }) => {
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
    ADD NOTIFICATION
    ========================================
    */

    const addNotification =
      (
        message,
        type =
          "info"
      ) => {
        const newNotification =
          {
            id:
              Date.now(),

            message,

            type,

            createdAt:
              new Date(),
          };

        setNotifications(
          (prev) => [
            newNotification,
            ...prev,
          ]
        );
      };

    /*
    ========================================
    REMOVE NOTIFICATION
    ========================================
    */

    const removeNotification =
      (id) => {
        setNotifications(
          (prev) =>
            prev.filter(
              (
                notification
              ) =>
                notification.id !==
                id
            )
        );
      };

    return (
      <NotificationContext.Provider
        value={{
          notifications,

          addNotification,

          removeNotification,
        }}
      >
        {children}
      </NotificationContext.Provider>
    );
  };

export const useNotification =
  () =>
    useContext(
      NotificationContext
    );