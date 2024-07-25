// backend/routes/event.route.js
import express from 'express';
import { createEvent, getEvents, updateEvent, cancelEvent, registerForEvent,getAllEvents, deleteEvent, getAllRegistrations, updateRegistrationStatus, markAttendance, getAttendanceForEvent } from '../controller/event.controller.js';

const router = express.Router();

router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/all_events', getAllEvents);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.post('/events/:id/register', registerForEvent);
router.delete('/registrations/:id', cancelEvent);
router.get('/registrations', getAllRegistrations);
router.post('/registrations/:registrationId/action', updateRegistrationStatus);
router.post('/registrations/:registrationId/attendance', markAttendance);
router.get('/events/:eventId/attendance', getAttendanceForEvent);

export default router;
