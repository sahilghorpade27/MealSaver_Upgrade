import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // ✅ Important to parse JSON body

// ✅ Routes
app.use("/api/users", userRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // These options are optional since Mongoose 6+
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
