import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { xss } from 'express-xss-sanitizer'

import { authRoutes } from './routes/auth-routes'
import { walletRoutes } from './routes/wallet-routes'
import { transactionsRoutes } from './routes/transactions-routes'
import { errorHandler } from './middlewares/error-handler'

dotenv.config()

if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
    throw new Error('Variáveis de ambiente obrigatórias não estão definidas!')
}

export const app = express()
export const prisma = new PrismaClient()

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
        crossOriginResourcePolicy: { policy: 'same-site' }, // Para evitar carregamento cross-origin
    }),
)

app.use(
    cors({
        origin: process.env.FRONTEND_URLS?.split(',') || ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
)

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite por IP
    message: 'Muitas requisições deste IP. Tente novamente mais tarde.',
})

app.use(express.json({ limit: '10kb' }))
app.use(generalLimiter)
app.use(xss())
app.disable('x-powered-by')
app.use(errorHandler)
app.use('/auth', authRoutes)
app.use('/wallet', walletRoutes)
app.use('/transactions', transactionsRoutes)
