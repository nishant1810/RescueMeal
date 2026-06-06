import logger
from "../config/logger.js";

/*
========================================
GLOBAL ERROR MIDDLEWARE
========================================
*/

const errorMiddleware =
  (
    err,
    req,
    res,
    next
  ) => {

    /*
    ========================================
    LOG ERROR
    ========================================
    */

    logger.error(

      err.stack ||
      err.message ||
      err
    );

    /*
    ========================================
    DEFAULT VALUES
    ========================================
    */

    let statusCode =
      err.statusCode || 500;

    let message =
      err.message ||
      "Internal Server Error";

    /*
    ========================================
    INVALID OBJECT ID
    ========================================
    */

    if (
      err.name ===
      "CastError"
    ) {

      statusCode = 400;

      message =
        "Invalid resource ID";
    }

    /*
    ========================================
    DUPLICATE KEY
    ========================================
    */

    if (
      err.code === 11000
    ) {

      statusCode = 400;

      message =
        "Duplicate field value";
    }

    /*
    ========================================
    JWT ERROR
    ========================================
    */

    if (
      err.name ===
      "JsonWebTokenError"
    ) {

      statusCode = 401;

      message =
        "Invalid token";
    }

    /*
    ========================================
    JWT EXPIRED
    ========================================
    */

    if (
      err.name ===
      "TokenExpiredError"
    ) {

      statusCode = 401;

      message =
        "Token expired";
    }

    /*
    ========================================
    RESPONSE
    ========================================
    */

    return res
      .status(statusCode)
      .json({

        success: false,

        statusCode,

        message,

        stack:

          process.env.NODE_ENV ===
          "production"

            ? null

            : err.stack,
      });
  };

export default errorMiddleware;