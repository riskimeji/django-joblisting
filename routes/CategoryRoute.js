import express from "express";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategory,
} from "../controllers/Category.js";

const router = express.Router();

router.post("/api/category", createCategory);
router.get("/api/category", getCategory);
router.get("/api/category/:id", getCategoryById);
router.delete("/api/category/:id", verifyUser, adminOnly, deleteCategory);
router.patch("/api/category/:id", verifyUser, adminOnly, updateCategoryById);
export default router;
