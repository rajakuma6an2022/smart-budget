import express from "express";
import { signup, sendOtp, verifyOtp, updateUserProfile } from "../controllers/userControllers.js";
import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

// public
router.post("/signup", signup);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// private
router.put("/user/edit/:id", protect, updateUserProfile);

// router.get("/user/profile", protect, getUserProfile);
// router.get("/users", getAllUsers);


export default router;
