import express from "express";
import {
  getUser,
  getUserById,
  deleteUser,
  updateUserById,
  createUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUser);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUserById);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

//register
router.post("/api/user/register", createUser);

//admin
router.get("/api/admin/user", verifyUser, adminOnly, getUser);
router.get("/api/admin/user/:id", verifyUser, adminOnly, getUserById);
router.delete("/api/admin/user/:id", verifyUser, adminOnly, deleteUser);
router.patch("/api/admin/user/:id", verifyUser, adminOnly, updateUserById);

export default router;
