import express from "express";
import {
    RetrieveUV,
    Classify,
    Forecast,
} from "../controllers/uv.controller.js";
import { VerifToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/index", VerifToken, RetrieveUV);
router.post("/classify", VerifToken, Classify);
router.post("/forecast", VerifToken, Forecast);

export default router;
