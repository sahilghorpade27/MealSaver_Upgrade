import express from 'express';
import User from '../models/User.js';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/test-users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;
