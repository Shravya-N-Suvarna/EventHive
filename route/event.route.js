// backend/routes/event.route.js
import express from 'express';
import { createEvent, getEvents, updateEvent, cancelEvent, registerForEvent,getAllEvents, deleteEvent } from '../controller/event.controller.js';

const router = express.Router();

router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/all_events', getAllEvents);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.post('/events/:id/register', registerForEvent);
router.delete('/registrations/:id', cancelEvent);

export default router;
