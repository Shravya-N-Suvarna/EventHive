// server/routes/authRoutes.js
import express from 'express';
import { login } from '../controller/admin.controller.js';

const router = express.Router();

router.post('/admin_login', login);

export default router;
