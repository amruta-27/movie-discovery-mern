import { Router } from "express";
import { discover, search, details } from "../controllers/movieController.js";

const router = Router();

router.get("/discover", discover);
router.get("/search", search);
router.get("/:id", details);

export default router;
