import express from "express";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

import {
  getCareer,
  getCareerById,
  createCareer,
  deleteCareer,
  updateCareerById,
} from "../controllers/Career.js";

const router = express.Router();

router.post("/api/career", createCareer);
router.get("/api/career", getCareer);
router.get("/api/career/:id", getCareerById);
router.delete("/api/career/:id", verifyUser, adminOnly, deleteCareer);
router.patch("/api/career/:id", verifyUser, adminOnly, updateCareerById);

export default router;
