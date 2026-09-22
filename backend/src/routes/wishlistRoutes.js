import { Router } from "express";
import {
  getWishlist,
  addWishlist,
  removeWishlist
} from "../controllers/wishlistController.js";

const router = Router();

router.get("/", getWishlist);
router.post("/", addWishlist);
router.delete("/:movieId", removeWishlist);

export default router;
