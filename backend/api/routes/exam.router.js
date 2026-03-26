import express from "express";
const router = express.Router();
import * as controller from "../controllers/exam.controller.js";

router.post("/search", controller.searchExamResult);

export default router;
