import { createClient }
from "redis";

import logger
from "./logger.js";

/*
========================================
REDIS CLIENT
========================================
*/

const redisClient =
  createClient({

    url:
      process.env.REDIS_URL ||
      "redis://localhost:6379",
  });

/*
========================================
REDIS EVENTS
========================================
*/

redisClient.on(

  "connect",

  () => {

    logger.info(
      "✅ Redis Connected"
    );
  }
);

redisClient.on(

  "error",

  (error) => {

    logger.error(

      `Redis Error: ${error.message}`
    );
  }
);

/*
========================================
CONNECT REDIS
========================================
*/

const connectRedis =
  async () => {

    try {

      await redisClient.connect();

    } catch (error) {

      logger.error(
        error
      );
    }
  };

export {

  redisClient,

  connectRedis,
};