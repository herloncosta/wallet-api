import { PrismaClient } from '@prisma/client';
import express from 'express';
import dotenv from 'dotenv';
import { login, register } from './routes/auth-routes';

dotenv.config();

export const app = express();
export const prisma = new PrismaClient();

app.use(express.json());

app.post('/auth/register', register);
app.post('/auth/login', login);
