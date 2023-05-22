import express from "express";
import retrieveUV from "../controllers/uv.controller.js";

const router = express.Router();

router.get("/index", retrieveUV);

export default router;
