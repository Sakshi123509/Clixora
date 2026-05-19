import express from 'express';
import { register, login, logout, googleAuth} from '../controllers/authcontroller.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/google', googleAuth);

export default router;