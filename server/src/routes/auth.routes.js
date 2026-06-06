import express
from "express";

import {

  loginUser,

  registerUser,

} from "../controllers/auth.controller.js";

import validate
from "../middleware/zodValidation.middleware.js";

import {

  loginSchema,

  registerSchema,

} from "../validators/auth.validation.js";

const router =
  express.Router();

/*
========================================
REGISTER
========================================
*/

router.post(

  "/register",

  validate(
    registerSchema
  ),

  registerUser
);

/*
========================================
LOGIN
========================================
*/

router.post(

  "/login",

  validate(
    loginSchema
  ),

  loginUser
);

export default
router;