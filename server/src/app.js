import express from "express";

import cors from "cors";

import helmet from "helmet";

import compression from "compression";

import cookieParser from "cookie-parser";

import morgan from "morgan";

import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";

import foodRoutes from "./routes/food.routes.js";

import userRoutes from "./routes/user.routes.js";

import notFoundMiddleware from "./middleware/notFoundMiddleware.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

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
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
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
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

app.use(cookieParser());

/*
========================================
LOGGER
========================================
*/

app.use(morgan("dev"));

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

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
      success: false,

      message:
        "Too many requests from this IP",
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

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message:
      "RescueMeal API Running Successfully",
  });
});

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
NOT FOUND MIDDLEWARE
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

export default app;