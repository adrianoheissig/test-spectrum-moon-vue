import express from "express";
import { getUserInformation, Register, Login } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/api/user/:id", verifyToken, getUserInformation);
router.post("/api/users", Register);
router.post("/api/login", Login);

export default router;
