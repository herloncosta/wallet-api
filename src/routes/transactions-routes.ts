import { Router } from 'express'
import { authenticate } from '../middlewares/auth-middleware'
import { listTransactions, transfer } from '../controllers/transactions-controller'

export const transactionsRoutes = Router()

transactionsRoutes.post('/transfer', authenticate, transfer)
transactionsRoutes.get('/', authenticate, listTransactions)
