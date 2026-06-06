import morgan
from "morgan";

import logger
from "../config/logger.js";

/*
========================================
MORGAN STREAM
========================================
*/

const stream = {

  write: (message) => {

    logger.info(
      message.trim()
    );
  },
};

/*
========================================
MORGAN LOGGER
========================================
*/

const morganMiddleware =
  morgan(

    "dev",

    { stream }
  );

export default
morganMiddleware;