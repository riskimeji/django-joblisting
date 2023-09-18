import express from "express";
import {
  getJobApplied,
  createJobApplied,
  updateJobApplied,
  deleteJob,
} from "../controllers/JobApplied.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/user/jobapplied", verifyUser, getJobApplied);
router.post("/api/user/jobapplied", verifyUser, createJobApplied);
router.patch("/api/user/jobapplied/:id", verifyUser, updateJobApplied);
router.delete("/api/user/jobapplied/:id", verifyUser, deleteJob);

export default router;
