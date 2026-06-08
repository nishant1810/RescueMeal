import {
  useEffect,
} from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import toast
from "react-hot-toast";

/*
========================================
SOCKET
========================================
*/

import {
  useSocket,
} from "../../context/SocketContext";

/*
========================================
USE FOOD SOCKET
========================================
*/

const useFoodSocket =
  () => {

    /*
    ========================================
    SOCKET
    ========================================
    */

    const socket =
      useSocket();

    /*
    ========================================
    QUERY CLIENT
    ========================================
    */

    const queryClient =
      useQueryClient();

    /*
    ========================================
    SOCKET EVENTS
    ========================================
    */

    useEffect(() => {

      if (!socket) return;

      /*
      ========================================
      NEW FOOD EVENT
      ========================================
      */

      socket.on(

        "food:new",

        (food) => {

          console.log(
            "🍱 New Food:",
            food
          );

          /*
          ========================================
          TOAST
          ========================================
          */

          toast.success(
            "New food donation added!"
          );

          /*
          ========================================
          INVALIDATE CACHE
          ========================================
          */

          queryClient.invalidateQueries({

            queryKey: [
              "foods",
            ],
          });

          queryClient.invalidateQueries({

            queryKey: [
              "my-donations",
            ],
          });

          queryClient.invalidateQueries({

            queryKey: [
              "dashboard-stats",
            ],
          });
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

    }, [

      socket,

      queryClient,
    ]);
  };

export default
useFoodSocket;