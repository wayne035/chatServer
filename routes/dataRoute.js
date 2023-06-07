import express from 'express'
import { 
    getUserControllor,
    addMessageControllor,
    getMessageControllor
 } from '../controllers/dataController.js'

const router = express.Router();

// /api/userdata/all
router.get('/all',getUserControllor);
// /api/userdata/addmsg
router.post('/addmsg',addMessageControllor);
// /api/userdata/getmsg
router.post('/getmsg',getMessageControllor);

export default router