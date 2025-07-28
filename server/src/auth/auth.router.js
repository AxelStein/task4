import express from "express";
import controller from './auth.controller.js';
import { validateBody } from "../middleware/request.validator.js";
import { loginSchema, signupSchema } from "./auth.schemas.js";

const router = express.Router();
router.post('/login', validateBody(loginSchema), controller.login);
router.post('/signup', validateBody(signupSchema), controller.signup);

export default router;