import express from "express";
import { MainRoutes } from "./types";
import userRouter from "./user";

const router = express.Router();

router.use(MainRoutes.USER, userRouter);

export default router;
