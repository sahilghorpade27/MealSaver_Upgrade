import express from "express";
import Institute from "../models/institute.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch institutes" });
  }
});

export default router;
