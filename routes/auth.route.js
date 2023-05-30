import express from "express";
import { Register, Preference, Login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", Register);
router.put("/preference", Preference);
router.post("/login", Login);

export default router;
