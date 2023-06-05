import express from 'express'
import { 
    createUserControllor,
    loginUserControllor 
} from '../controllers/userController.js'

const router = express.Router();

// api/auth/register
router.post('/register',createUserControllor)
// api/auth/login
router.post('/login',loginUserControllor)
export default router