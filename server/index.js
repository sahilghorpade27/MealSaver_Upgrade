import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import instituteRoutes from "./routes/instituteRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load env variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/institutes", instituteRoutes);
app.use("/api", authRoutes);


// ✅ Register routes BEFORE starting the server
app.get("/", (req, res) => {
  res.send("Meal Saver Backend is Running 🚀");
});

// ✅ Connect to DB and then start server
mongoose
  .connect(process.env.META_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to Meta Database");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
  });
