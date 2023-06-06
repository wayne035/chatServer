import express from 'express'
import { getUserControllor } from '../controllers/dataController.js'

const router = express.Router();

// /api/userdata/all
router.get('/all',getUserControllor);

export default router