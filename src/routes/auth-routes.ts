import { Router } from 'express';
import { authenticate, register } from '../controllers/auth-controller';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/authenticate', authenticate);
