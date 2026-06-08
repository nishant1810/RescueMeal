import {
  useEffect,
} from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

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
REALTIME UPDATES
========================================
*/

const useRealtimeUpdates =
  () => {

    const socket =
      useSocket();

    const queryClient =
      useQueryClient();

    /*
    ========================================
    SOCKET LISTENERS
    ========================================
    */

    useEffect(() => {

      if (!socket) return;

      /*
      ========================================
      NEW FOOD
      ========================================
      */

      socket.on(

        "food:new",

        () => {

          queryClient.invalidateQueries({

            queryKey:
              ["available-food"],
          });

          queryClient.invalidateQueries({

            queryKey:
              ["dashboard-stats"],
          });
        }
      );

      /*
      ========================================
      FOOD CLAIMED
      ========================================
      */

      socket.on(

        "food:claimed",

        () => {

          queryClient.invalidateQueries({

            queryKey:
              ["claimed-food"],
          });

          queryClient.invalidateQueries({

            queryKey:
              ["available-food"],
          });

          queryClient.invalidateQueries({

            queryKey:
              ["dashboard-stats"],
          });
        }
      );

      /*
      ========================================
      DELIVERY UPDATED
      ========================================
      */

      socket.on(

        "delivery:updated",

        () => {

          queryClient.invalidateQueries({

            queryKey:
              ["deliveries"],
          });

          queryClient.invalidateQueries({

            queryKey:
              ["volunteer-deliveries"],
          });

          queryClient.invalidateQueries({

            queryKey:
              ["claimed-food"],
          });

          queryClient.invalidateQueries({

            queryKey:
              ["dashboard-stats"],
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

        socket.off(
          "food:claimed"
        );

        socket.off(
          "delivery:updated"
        );
      };

    }, [

      socket,

      queryClient,
    ]);
  };

export default useRealtimeUpdates;