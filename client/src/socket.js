import {io,} from "socket.io-client";

/*
========================================
SOCKET CONNECTION
========================================
*/

const socket = io(
  import.meta.env
    .VITE_API_URL,
  {
    transports: [
      "websocket",
    ],

    withCredentials: true,
  }
);

export default socket;