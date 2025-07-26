import express from "express";
import userRouter from "./user/user.router.js";
import authRouter from "./auth/auth.router.js";
import authValidator from './middleware/auth.validator.js';

const router = express.Router();
router.use('/user', authValidator, userRouter);
router.use('/auth', authRouter);

export default router;