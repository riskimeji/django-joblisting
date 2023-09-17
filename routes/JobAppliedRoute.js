import express from "express";
import { getJobApplied, createJobApplied } from "../controllers/JobApplied.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/user/jobapplied", verifyUser, getJobApplied);
router.post("/api/user/jobapplied", verifyUser, createJobApplied);

export default router;
