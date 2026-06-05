import { Server }
from "socket.io";

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

    io = new Server(server, {
      cors: {
        origin:
          process.env.CLIENT_URL,

        methods: [
          "GET",
          "POST",
          "PUT",
          "DELETE",
        ],

        credentials: true,
      },
    });

    /*
    ========================================
    CONNECTION
    ========================================
    */

    io.on(
      "connection",
      (socket) => {

        console.log(
          "User Connected:",
          socket.id
        );

        /*
        ========================================
        DISCONNECT
        ========================================
        */

        socket.on(
          "disconnect",
          () => {

            console.log(
              "User Disconnected:",
              socket.id
            );
          }
        );
      }
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
        "Socket.io not initialized"
      );
    }

    return io;
  };