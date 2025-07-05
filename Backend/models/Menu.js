import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  breakfast: String,
  lunch: String,
  dinner: String,
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
