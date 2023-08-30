import express from "express";
import { MainRoutes } from "./types";
import userRouter from "./user";
import characterRouter from "./character";

const router = express.Router();

router.use(MainRoutes.USER, userRouter);
router.use(MainRoutes.CHARACTERS, characterRouter);

export default router;
