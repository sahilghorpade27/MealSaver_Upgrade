import express from 'express';
import { loginAdmin, uploadMenu } from '../controllers/adminController.js';
import { getMealCounts } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/upload-menu', uploadMenu);
router.get('/meal-counts', getMealCounts);

export default router;
