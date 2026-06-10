import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

/*
========================================
LOGGER
========================================
*/

import morganMiddleware from "./middleware/morgan.middleware.js";

/*
========================================
ROUTES
========================================
*/

import authRoutes from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import userRoutes from "./routes/user.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";

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
PATH CONFIG
========================================
*/

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

/*
========================================
TRUST PROXY
========================================
*/

app.set("trust proxy", 1);

/*
========================================
SECURITY HEADERS
========================================
*/

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/*
========================================
ALLOWED ORIGINS
========================================
*/

const allowedOrigins = [

  "http://localhost:5173",

  process.env.CLIENT_URL,
];

/*
========================================
CORS
========================================
*/

app.use(
  cors({

    origin: function (
      origin,
      callback
    ) {

      /*
      ========================================
      ALLOW NON-BROWSER REQUESTS
      ========================================
      */

      if (!origin) {

        return callback(
          null,
          true
        );
      }

      /*
      ========================================
      CHECK ALLOWED ORIGINS
      ========================================
      */

      if (
        allowedOrigins.includes(
          origin
        )
      ) {

        callback(
          null,
          true
        );

      } else {

        callback(
          new Error(
            `CORS blocked for origin: ${origin}`
          )
        );
      }
    },

    credentials: false,
  })
);

/*
========================================
RATE LIMITER
========================================
*/

const limiter = rateLimit({

  windowMs:
    15 * 60 * 1000,

  max:
    process.env.NODE_ENV ===
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

app.use("/api", limiter);

/*
========================================
BODY PARSER
========================================
*/

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({

    extended: true,

    limit: "10mb",
  })
);

/*
========================================
COOKIE PARSER
========================================
*/

app.use(cookieParser());

/*
========================================
HPP PROTECTION
========================================
*/

app.use(hpp());

/*
========================================
COMPRESSION
========================================
*/

app.use(compression());

/*
========================================
LOGGER
========================================
*/

app.use(morganMiddleware);

/*
========================================
STATIC FILES
========================================
*/

app.use(

  "/uploads",

  express.static(

    path.join(
      __dirname,
      "../uploads"
    )
  )
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

app.use(
  "/api/v1/delivery",
  deliveryRoutes
);

/*
========================================
404 HANDLER
========================================
*/

app.use((req, res) => {

  res.status(404).json({

    success: false,

    statusCode: 404,

    message:
      `Route Not Found - ${req.originalUrl}`,
  });
});

/*
========================================
GLOBAL ERROR HANDLER
========================================
*/

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.error(err);

/*
========================================
CORS ERROR
========================================
*/

    if (
      err.message?.includes(
        "CORS"
      )
    ) {

      return res.status(403).json({

        success: false,

        message:
          err.message,
      });
    }

    res.status(
      err.statusCode || 500
    ).json({

      success: false,

      statusCode:
        err.statusCode || 500,

      message:
        err.message ||
        "Internal Server Error",
    });
  }
);

/*
========================================
EXPORT APP
========================================
*/

export default app;