import express from "express";
import controller from './auth.controller.js';
import { validateBody } from "../middleware/request.validator.js";
import { loginSchema, signupSchema } from "./auth.schemas.js";

const router = express.Router();
router.post('/sign-in', validateBody(loginSchema), controller.signIn);
router.post('/sign-up', validateBody(signupSchema), controller.signUp);
router.post('/sign-out', controller.signOut);

export default router;