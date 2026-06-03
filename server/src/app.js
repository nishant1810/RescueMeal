import express from "express";

import cors from "cors";

import helmet from "helmet";

import compression from "compression";

import cookieParser from "cookie-parser";

import morgan from "morgan";

import rateLimit from "express-rate-limit";

import dotenv from "dotenv";

/*
========================================
ROUTES
========================================
*/

import authRoutes
from "./routes/auth.routes.js";

import foodRoutes
from "./routes/food.routes.js";

import userRoutes
from "./routes/user.routes.js";

/*
========================================
MIDDLEWARE
========================================
*/

import notFoundMiddleware
from "./middleware/notFoundMiddleware.js";

import errorMiddleware
from "./middleware/errorMiddleware.js";

/*
========================================
ENV CONFIG
========================================
*/

dotenv.config();

/*
========================================
APP
========================================
*/

const app = express();

/*
========================================
TRUST PROXY
========================================
*/

app.set("trust proxy", 1);

/*
========================================
CORS
========================================
*/

app.use(
  cors({
    origin:
      process.env
        .CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/*
========================================
SECURITY MIDDLEWARE
========================================
*/

app.use(
  helmet({
    crossOriginResourcePolicy:
      false,
  })
);

app.use(
  compression()
);

app.use(
  cookieParser()
);

/*
========================================
LOGGER
========================================
*/

if (
  process.env.NODE_ENV !==
  "production"
) {
  app.use(
    morgan("dev")
  );
}

/*
========================================
BODY PARSER
========================================
*/

app.use(
  express.json({
    limit: "30mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "30mb",
  })
);

/*
========================================
RATE LIMITER
========================================
*/

const limiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max:
      process.env
        .NODE_ENV ===
      "production"
        ? 100
        : 1000,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
      success: false,

      message:
        "Too many requests from this IP. Please try again later.",
    },
  });

/*
========================================
APPLY RATE LIMIT
========================================
*/

app.use(
  "/api",
  limiter
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
        "RescueMeal API Running Successfully",
    });
  }
);

/*
========================================
API ROUTES
========================================
*/

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/food",
  foodRoutes
);

app.use(
  "/api/v1/users",
  userRoutes
);

/*
========================================
404 HANDLER
========================================
*/

app.use(
  notFoundMiddleware
);

/*
========================================
GLOBAL ERROR HANDLER
========================================
*/

app.use(
  errorMiddleware
);

/*
========================================
EXPORT APP
========================================
*/

export default app;