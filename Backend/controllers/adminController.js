import Menu from '../models/Menu.js';
import Attendance from '../models/Attendance.js';

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ message: 'Admin login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }
};

export const uploadMenu = async (req, res) => {
  const { date, breakfast, lunch, dinner } = req.body;

  try {
    const existing = await Menu.findOne({ date });
    if (existing) {
      existing.breakfast = breakfast;
      existing.lunch = lunch;
      existing.dinner = dinner;
      await existing.save();
      return res.json({ message: 'Menu updated for date' });
    }

    const newMenu = new Menu({ date, breakfast, lunch, dinner });
    await newMenu.save();

    res.status(201).json({ message: 'Menu uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading menu', error: err.message });
  }
};

// Get total meal counts for a specific date
export const getMealCounts = async (req, res) => {
  const { date } = req.query;

  try {
    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    const records = await Attendance.find({ date: queryDate });

    let breakfast = 0, lunch = 0, dinner = 0;

    for (const record of records) {
      if (record.breakfast) breakfast++;
      if (record.lunch) lunch++;
      if (record.dinner) dinner++;
    }

    res.json({ date, breakfast, lunch, dinner, total: records.length });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance data' });
  }
};
