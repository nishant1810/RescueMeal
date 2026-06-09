import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();

/*
========================================
MIDDLEWARE
========================================
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
========================================
CORS
========================================
*/

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],

    credentials: true,
  })
);

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
API ROUTES
========================================
*/

app.use("/api/v1/auth", authRoutes);

/*
========================================
404 ROUTE HANDLER
========================================
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route Not Found - ${req.originalUrl}`,
  });
});

/*
========================================
GLOBAL ERROR HANDLER
========================================
*/

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message:
      err.message || "Internal Server Error",

    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : null,
  });
});

/*
========================================
EXPORT APP
========================================
*/

export default app;