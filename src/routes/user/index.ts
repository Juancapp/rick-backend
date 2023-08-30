import express from "express";
import controllers from "./controllers";

const router = express.Router();

router.route("/").post(controllers.createUser);
router.route("/editfavorite").patch(controllers.editFavoriteCharacter);

export default router;
