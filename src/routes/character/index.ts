import express from "express";
import controllers from "./controllers";

const router = express.Router();

router.route("/:sortby/:page").get(controllers.getCharacters);

export default router;
