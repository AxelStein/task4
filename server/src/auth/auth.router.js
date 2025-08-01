import express from "express";
import controller from './auth.controller.js';
import { validateBody } from "../middleware/request.validator.js";
import { loginSchema, signupSchema, resetPasswordSchema, restorePasswordSchema } from "./auth.schemas.js";

const router = express.Router();
router.post('/sign-in', validateBody(loginSchema), controller.signIn);
router.post('/sign-up', validateBody(signupSchema), controller.signUp);
router.post('/sign-out', controller.signOut);
router.post('/reset-password', validateBody(resetPasswordSchema), controller.resetPassword);
router.post('/restore-password', validateBody(restorePasswordSchema), controller.restorePassword);

export default router;