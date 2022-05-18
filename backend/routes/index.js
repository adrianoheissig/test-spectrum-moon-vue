import express from "express";
import { getUserInformation, Register, Login } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

console.log(router);

//router.get("/api/user/:id", verifyToken, getUserInformation);
router.get("/api/user/:id", getUserInformation);
router.post("/api/register", Register);
router.post("/api/login", Login);

export default router;
