import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import { getMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:id',protectRoute, getMessages);
router.post('/send/:id',protectRoute, sendMessage);



export default router;