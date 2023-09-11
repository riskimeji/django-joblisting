import express from "express";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

import {
  getSubscription,
  getSubscriptionById,
  createSubscription,
  deleteSubscription,
  updateSubscriptionById,
} from "../controllers/Subscription.js";

const router = express.Router();

router.post("/api/subscription", createSubscription);
router.get("/api/subscription", verifyUser, adminOnly, getSubscription);
router.get("/api/subscription/:id", verifyUser, adminOnly, getSubscriptionById);
router.delete(
  "/api/subscription/:id",
  verifyUser,
  adminOnly,
  deleteSubscription
);
router.patch(
  "/api/subscription/:id",
  verifyUser,
  adminOnly,
  updateSubscriptionById
);

export default router;
