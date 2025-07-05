import express from 'express';
import { getMenuForTomorrow, markAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/menu', getMenuForTomorrow);
router.post('/mark', markAttendance);

export default router;
