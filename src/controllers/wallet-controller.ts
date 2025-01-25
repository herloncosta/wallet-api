import { Request, Response } from 'express'
import { prisma } from '../app'

export function addBalance(req: Request, res: Response) {
    const { amount } = req.body
    const userId = req.body.userId
    const wallet = prisma.wallet.update({
        where: { userId },
        data: { balance: { increment: amount } },
    })

    res.json({ message: 'Balance added successfully', wallet })
}
