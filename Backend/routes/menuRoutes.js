import express from 'express';
import Menu from '../models/Menu.js'; // Your Menu model

const router = express.Router();

// Fetch menu for a specific date
router.get('/:date', async (req, res) => {
  const { date } = req.params;

  try {
    const menu = await Menu.findOne({ date });
    if (menu) {
      res.json({ success: true, menu });
    } else {
      res.json({ success: false, message: 'Menu not found for this date' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
