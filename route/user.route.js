import express from 'express';
import { getEvents } from '../controller/event.controller.js';
import { Login, Register, getAllUsers,updateUserStatus, getUsersByStatus } from '../controller/user.controller.js';
// import multer from 'multer';
// import path from 'path';

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

router.get('/', getEvents);
router.post("/register",Register);
router.post("/login",Login);
router.get('/all', getAllUsers);
router.post('/update-status', updateUserStatus);
router.get('/status', getUsersByStatus);

// router.post('/', createEvent);

// router.delete('/:id', deleteEvent);

// router.post('/', upload.single('image'), createEvent);
// router.delete('/:id', deleteEvent);

export default router;
