import express from "express";
import controllers from "./controllers";

const router = express.Router();

router.route("/").post(controllers.createUser);
router.route("/edit-favorite").patch(controllers.editFavoriteCharacter);

export default router;
