import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String, // Store in YYYY-MM-DD
  meals: {
    breakfast: Boolean,
    lunch: Boolean,
    dinner: Boolean,
  },
});

export default mongoose.model("Attendance", attendanceSchema);
