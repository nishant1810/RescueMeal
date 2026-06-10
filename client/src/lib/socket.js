import {
  io,
} from "socket.io-client";

/*
========================================
SOCKET URL
========================================
*/

const SOCKET_URL =

  import.meta.env
    .VITE_SOCKET_URL;

/*
========================================
SOCKET INSTANCE
========================================
*/

export const socket =
  io(

    SOCKET_URL,

    {

      autoConnect: false,

      transports: [

        "polling",

        "websocket",
      ],

      reconnection: true,

      reconnectionAttempts: 5,

      reconnectionDelay: 1000,

      timeout: 10000,
    }
  );