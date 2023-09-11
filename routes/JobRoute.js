import express from "express";
import {
  getJob,
  getJobById,
  deleteJob,
  updateJobById,
  createJob,
} from "../controllers/Jobs.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/job", verifyUser, getJob);
router.get("/job/:id", verifyUser, getJobById);
router.post("/job", verifyUser, createJob);
router.patch("/job/:id", verifyUser, updateJobById);
router.delete("/job/:id", verifyUser, deleteJob);

//Api
router.get("/api/admin/job", verifyUser, getJob);
router.post("/api/admin/job", verifyUser, createJob);
router.delete("/api/admin/job/:id", verifyUser, deleteJob);
router.get("/api/admin/job/:id", verifyUser, getJobById);
router.patch("/api/admin/job/:id", verifyUser, updateJobById);

export default router;
