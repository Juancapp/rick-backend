import express from "express";
import controllers from "./controllers";

const router = express.Router();

router.route("/").post(controllers.createUser);

export default router;
