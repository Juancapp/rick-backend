import express from "express";
import controllers from "./controllers";
import authMiddleware from "../../middlewares/firebase";

const router = express.Router();

router.route("/").post(controllers.createUser);
router
  .route("/edit-favorite")
  .patch(authMiddleware, controllers.editFavoriteCharacter);

export default router;
