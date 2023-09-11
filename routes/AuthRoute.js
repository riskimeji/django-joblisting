import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", logOut);

//Login User
router.post("/api/user/login", Login);
router.delete("/api/user/logout", logOut);

//Login Admin
router.post("/api/admin/login", Login);
router.delete("/api/admin/logout", logOut);

//Get Me
router.get("/api/auth/me", Me);

export default router;
