import express from 'express'
import { 
    createUserControllor,
    loginUserControllor,
    logoutUserControllor 
} from '../controllers/userController.js'

const router = express.Router();

// api/auth/register
router.post('/register',createUserControllor);
// api/auth/login
router.post('/login',loginUserControllor);
// api/auth/logout
router.get('/logout',logoutUserControllor)

export default router