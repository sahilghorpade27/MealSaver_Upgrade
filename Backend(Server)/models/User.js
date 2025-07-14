import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNumber: String,
  password: String,
});

export default mongoose.model("User", userSchema);
