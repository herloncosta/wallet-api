import { PrismaClient } from '@prisma/client';
import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth-routes';

dotenv.config();

export const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use('/auth', authRoutes);
