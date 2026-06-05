import http from "http";

import dotenv
from "dotenv";

import {
  Server,
} from "socket.io";

import app
from "./app.js";

import connectDB
from "./config/db.js";

/*
========================================
ENV CONFIG
========================================
*/

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
        process.env.CLIENT_URL ||
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
EXPORT SOCKET IO
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
      `Socket Connected: ${socket.id}`
    );

    /*
    ========================================
    JOIN ROOM
    ========================================
    */

    socket.on(
      "joinRoom",
      (roomId) => {

        socket.join(
          roomId
        );

        console.log(
          `Socket ${socket.id} joined room ${roomId}`
        );
      }
    );

    /*
    ========================================
    LEAVE ROOM
    ========================================
    */

    socket.on(
      "leaveRoom",
      (roomId) => {

        socket.leave(
          roomId
        );

        console.log(
          `Socket ${socket.id} left room ${roomId}`
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
      () => {

        console.log(
          `Socket Disconnected: ${socket.id}`
        );
      }
    );
  }
);

/*
========================================
HEALTH CHECK
========================================
*/

app.get(
  "/",
  (req, res) => {

    res.status(200).json({
      success: true,

      message:
        "RescueMeal API Running",
    });
  }
);

/*
========================================
PORT
========================================
*/

const PORT =
  process.env.PORT ||
  5000;

/*
========================================
START SERVER
========================================
*/

server.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );
  }
);