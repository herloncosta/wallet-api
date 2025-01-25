import { Router } from 'express'
import { authenticate } from '../middlewares/auth-middleware'
import { addBalance } from '../controllers/wallet-controller'

export const walletRoutes = Router()

walletRoutes.post('/add-balance', authenticate, addBalance)
