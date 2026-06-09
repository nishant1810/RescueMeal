import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "./app.js";

import connectDB from "./config/db.js";

import logger from "./config/logger.js";

import "./config/redis.js";

import { initSocket } from "./socket/socket.js";

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

const server = http.createServer(app);

/*
========================================
INITIALIZE SOCKET
========================================
*/

initSocket(server);

/*
========================================
HEALTH CHECK
========================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RescueMeal API Running",
  });
});

/*
========================================
PORT
========================================
*/

const PORT = process.env.PORT || 5000;

/*
========================================
START SERVER
========================================
*/

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

/*
========================================
SERVER ERROR HANDLER
========================================
*/

server.on("error", (error) => {
  logger.error(error);

  process.exit(1);
});

/*
========================================
UNHANDLED REJECTION
========================================
*/

process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Rejection: ${error.message}`);

  server.close(() => {
    process.exit(1);
  });
});

/*
========================================
UNCAUGHT EXCEPTION
========================================
*/

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);

  process.exit(1);
});