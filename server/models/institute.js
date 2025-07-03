import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  dbURI: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Institute = mongoose.model("Institute", instituteSchema);

export default Institute;
