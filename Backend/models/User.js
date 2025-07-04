import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true }, // Will be hashed
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;