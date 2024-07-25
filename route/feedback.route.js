import express from 'express';
import { getFeedback, postFeedback } from '../controller/feedback.controller.js';


const router = express.Router();

router.post('/feedback', postFeedback);
router.get('/all_feedback', getFeedback);

export default router;