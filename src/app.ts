import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import { authRoutes } from './routes/auth-routes'
import { walletRoutes } from './routes/wallet-routes'
import { transactionsRoutes } from './routes/transactions-routes'

dotenv.config()

export const app = express()
export const prisma = new PrismaClient()

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/wallet', walletRoutes)
app.use('/transactions', transactionsRoutes)
