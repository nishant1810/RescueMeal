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
    .VITE_SOCKET_URL ||

  "http://localhost:5000";

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
        "websocket",
      ],

      withCredentials: true,
    }
  );