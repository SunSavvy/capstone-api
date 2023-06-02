import express from "express";
import { RetrieveUV, Classify } from "../controllers/uv.controller.js";

const router = express.Router();

router.get("/index", RetrieveUV);
router.post("/classify", Classify);

export default router;
