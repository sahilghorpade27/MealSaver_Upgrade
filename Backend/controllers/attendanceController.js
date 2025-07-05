import Attendance from '../models/Attendance.js';
import Menu from '../models/Menu.js';

export const getMenuForTomorrow = async (req, res) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  try {
    const menu = await Menu.findOne({ date: tomorrow });
    if (!menu) return res.status(404).json({ message: 'Menu not uploaded yet' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu' });
  }
};

export const markAttendance = async (req, res) => {
  const { regNo, breakfast, lunch, dinner } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const existing = await Attendance.findOne({ regNo, date: today });
    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked' });
    }

    const newEntry = new Attendance({ regNo, date: today, breakfast, lunch, dinner });
    await newEntry.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking attendance' });
  }
};
