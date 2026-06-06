import winston
from "winston";

/*
========================================
LOGGER CONFIG
========================================
*/

const logger =
  winston.createLogger({

    level:
      process.env.NODE_ENV ===
      "production"

        ? "info"

        : "debug",

    format:
      winston.format.combine(

        winston.format.timestamp({

          format:
            "YYYY-MM-DD HH:mm:ss",
        }),

        winston.format.errors({

          stack: true,
        }),

        winston.format.printf(

          ({
            level,
            message,
            timestamp,
            stack,
          }) => {

            return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
          }
        )
      ),

    transports: [

      /*
      ========================================
      ERROR LOG FILE
      ========================================
      */

      new winston.transports.File({

        filename:
          "logs/error.log",

        level:
          "error",
      }),

      /*
      ========================================
      COMBINED LOG FILE
      ========================================
      */

      new winston.transports.File({

        filename:
          "logs/combined.log",
      }),
    ],
  });

/*
========================================
DEV CONSOLE LOGGER
========================================
*/

if (
  process.env.NODE_ENV !==
  "production"
) {

  logger.add(

    new winston.transports.Console({

      format:
        winston.format.combine(

          winston.format.colorize(),

          winston.format.simple()
        ),
    })
  );
}

export default logger;