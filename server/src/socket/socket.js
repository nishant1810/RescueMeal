import { Server }
from "socket.io";

import logger
from "../config/logger.js";

/*
========================================
SOCKET INSTANCE
========================================
*/

let io;

/*
========================================
INITIALIZE SOCKET
========================================
*/

export const initSocket =
  (server) => {

    io = new Server(

      server,

      {

        cors: {

          origin:

            process.env.CLIENT_URL ||

            "http://localhost:5173",

          methods: [

            "GET",

            "POST",

            "PUT",

            "PATCH",

            "DELETE",
          ],

          credentials: true,
        },

        /*
        ========================================
        SOCKET OPTIONS
        ========================================
        */

        transports: [

          "websocket",

          "polling",
        ],

        pingTimeout:
          60000,

        pingInterval:
          25000,
      }
    );

    /*
    ========================================
    SOCKET CONNECTION
    ========================================
    */

    io.on(

      "connection",

      (socket) => {

        logger.info(

          `⚡ User Connected: ${socket.id}`
        );

        /*
        ========================================
        JOIN USER ROOM
        ========================================
        */

        socket.on(

          "joinRoom",

          (userId) => {

            try {

              if (!userId) {

                return;
              }

              socket.join(
                userId
              );

              logger.info(

                `✅ User ${userId} joined room`
              );

            } catch (error) {

              logger.error(
                error
              );
            }
          }
        );

        /*
        ========================================
        LEAVE ROOM
        ========================================
        */

        socket.on(

          "leaveRoom",

          (userId) => {

            try {

              if (!userId) {

                return;
              }

              socket.leave(
                userId
              );

              logger.info(

                `❌ User ${userId} left room`
              );

            } catch (error) {

              logger.error(
                error
              );
            }
          }
        );

        /*
        ========================================
        SOCKET ERROR
        ========================================
        */

        socket.on(

          "error",

          (error) => {

            logger.error(

              `SOCKET ERROR: ${error.message}`
            );
          }
        );

        /*
        ========================================
        DISCONNECT
        ========================================
        */

        socket.on(

          "disconnect",

          (reason) => {

            logger.info(

              `🔌 User Disconnected: ${socket.id}`
            );

            logger.info(

              `Disconnect Reason: ${reason}`
            );
          }
        );
      }
    );

    /*
    ========================================
    SOCKET INITIALIZED
    ========================================
    */

    logger.info(
      "🚀 Socket.io initialized successfully"
    );

    return io;
  };

/*
========================================
GET SOCKET INSTANCE
========================================
*/

export const getIO =
  () => {

    if (!io) {

      throw new Error(

        "Socket.io is not initialized"
      );
    }

    return io;
  };

/*
========================================
EXPORT SOCKET INSTANCE
========================================
*/

export { io };