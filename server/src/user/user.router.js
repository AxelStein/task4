import express from "express";
import controller from './user.controller.js';
import { validateBody, validateQuery } from "../middleware/request.validator.js";
import { blockByIdsSchema, deleteByIdsSchema, getListSchema } from "./user.schemas.js";

const router = express.Router();
router.get('/list', validateQuery(getListSchema), controller.getList);
router.post('/block-by-ids', validateBody(blockByIdsSchema), controller.blockByIds);
router.post('/delete-by-ids', validateBody(deleteByIdsSchema), controller.deleteByIds);

export default router;