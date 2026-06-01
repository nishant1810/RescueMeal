import express from "express";

import {
  loginUser,
  registerUser,
} from "../controllers/auth.js";

import validateMiddleware from "../middleware/validateMiddleware.js";

import {
  loginSchema,
  registerSchema,
} from "../validations/authValidation.js";

const router = express.Router();

/*
========================================
REGISTER
========================================
*/

router.post(
  "/register",

  validateMiddleware(registerSchema),

  registerUser
);

/*
========================================
LOGIN
========================================
*/

router.post(
  "/login",

  validateMiddleware(loginSchema),

  loginUser
);

export default router;