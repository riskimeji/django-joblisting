import express from "express";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import {
  getJobtype,
  getJobtypeById,
  createJobtype,
  updateJobtypeById,
  deleteJobtype,
} from "../controllers/JobType.js";

const router = express.Router();

router.post("/api/jobtype", createJobtype);
router.get("/api/jobtype", getJobtype);
router.get("/api/jobtype/:id", getJobtypeById);
router.delete("/api/jobtype/:id", verifyUser, adminOnly, deleteJobtype);
router.patch("/api/jobtype/:id", verifyUser, adminOnly, updateJobtypeById);
export default router;
