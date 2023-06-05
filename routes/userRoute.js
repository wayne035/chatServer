import express from 'express'
import { createUserControllor } from '../controllers/userController.js'

const router = express.Router();

// api/auth
router.post('/',createUserControllor)


export default router