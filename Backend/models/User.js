import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  regNo: String,
  name: String,
  year: String,
  mobile: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
export default User;
