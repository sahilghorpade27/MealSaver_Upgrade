import express from "express";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, rollNumber, password } = req.body;
  res.status(200).json({ success: true });
});

export default router;

