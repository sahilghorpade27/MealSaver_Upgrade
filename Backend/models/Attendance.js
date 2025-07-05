import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  regNo: { type: String, required: true },
  date: { type: Date, required: true },
  breakfast: { type: Boolean, default: false },
  lunch: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
