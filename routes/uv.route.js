import express from "express";
import {
    RetrieveUV,
    Classify,
    Forecast,
} from "../controllers/uv.controller.js";

const router = express.Router();

router.get("/index", RetrieveUV);
router.post("/classify", Classify);
router.post("/forecast", Forecast);

export default router;
