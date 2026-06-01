import http from "http";

import dotenv from "dotenv";

import { Server } from "socket.io";

import app from "./app.js";

import connectDB from "./config/db.js";

dotenv.config();

/*
========================================
DATABASE CONNECTION
========================================
*/

connectDB();

/*
========================================
CREATE HTTP SERVER
========================================
*/

const server =
  http.createServer(app);

/*
========================================
SOCKET.IO SERVER
========================================
*/

const io =
  new Server(server, {
    cors: {
      origin:
        "http://localhost:5173",

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
EXPORT IO
========================================
*/

export { io };

/*
========================================
SOCKET CONNECTION
========================================
*/

io.on(
  "connection",
  (socket) => {
    console.log(
      "Socket Connected:",
      socket.id
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "Socket Disconnected:",
          socket.id
        );
      }
    );
  }
);

/*
========================================
START SERVER
========================================
*/

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});