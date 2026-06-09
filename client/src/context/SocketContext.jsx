import React,
{
  createContext,

  useContext,

  useEffect,
} from "react";

/*
========================================
SOCKET
========================================
*/

import {
  socket,
} from "../lib/socket.js";

/*
========================================
AUTH
========================================
*/

import {
  useAuth,
} from "./AuthContext.jsx";

/*
========================================
CREATE CONTEXT
========================================
*/

const SocketContext =
  createContext();

/*
========================================
SOCKET PROVIDER
========================================
*/

export const SocketProvider =
  ({ children }) => {

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
    SOCKET CONNECTION
    ========================================
    */

    useEffect(() => {

      /*
      ========================================
      NO USER
      ========================================
      */

      if (!user) {

        socket.disconnect();

        return;
      }

      /*
      ========================================
      TOKEN
      ========================================
      */

      const token =
        localStorage.getItem(
          "token"
        );

      /*
      ========================================
      AUTH
      ========================================
      */

      socket.auth = {
        token,
      };

      /*
      ========================================
      CONNECT
      ========================================
      */

      socket.connect();

      /*
      ========================================
      CONNECT EVENT
      ========================================
      */

      const onConnect =
        () => {

          console.log(
            "✅ Socket Connected:",
            socket.id
          );

          /*
          ========================================
          JOIN ROLE ROOM
          ========================================
          */

          socket.emit(

            "join",

            {
              userId:
                user?._id,

              role:
                user?.role,
            }
          );
        };

      /*
      ========================================
      DISCONNECT EVENT
      ========================================
      */

      const onDisconnect =
        () => {

          console.log(
            "❌ Socket Disconnected"
          );
        };

      /*
      ========================================
      CONNECT ERROR
      ========================================
      */

      const onError =
        (error) => {

          console.log(
            "Socket Error:",
            error.message
          );
        };

      /*
      ========================================
      REGISTER EVENTS
      ========================================
      */

      socket.on(
        "connect",
        onConnect
      );

      socket.on(
        "disconnect",
        onDisconnect
      );

      socket.on(
        "connect_error",
        onError
      );

      /*
      ========================================
      CLEANUP
      ========================================
      */

      return () => {

        socket.off(
          "connect",
          onConnect
        );

        socket.off(
          "disconnect",
          onDisconnect
        );

        socket.off(
          "connect_error",
          onError
        );

        socket.disconnect();
      };

    }, [user]);

    return (

      <SocketContext.Provider
        value={socket}
      >

        {children}

      </SocketContext.Provider>
    );
  };

/*
========================================
USE SOCKET
========================================
*/

export const useSocket =
  () => {

    return useContext(
      SocketContext
    );
  };