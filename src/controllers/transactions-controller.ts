import { Request, Response } from 'express'
import { prisma } from '../app'

export async function transfer(req: Request, res: Response) {
    const { toWalletId, amount } = req.body

    if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    const fromWalletId = +req.userId

    if (fromWalletId === toWalletId) {
        res.status(400).json({ error: 'Cannot transfer to the same wallet' })
        return
    }

    const fromWallet = await prisma.wallet.findUnique({ where: { userId: fromWalletId } })
    const toWallet = await prisma.wallet.findUnique({ where: { userId: toWalletId } })

    if (!fromWallet || !toWallet) {
        res.status(404).json({ error: 'Wallet not found' })
        return
    }

    if (fromWallet.balance < amount) {
        res.status(400).json({ error: 'Insufficient balance' })
        return
    }

    await prisma.$transaction([
        prisma.wallet.update({
            where: { userId: fromWallet.id },
            data: { balance: { decrement: amount } },
        }),
        prisma.wallet.update({
            where: { userId: toWalletId },
            data: { balance: { increment: amount } },
        }),
        prisma.transaction.create({
            data: {
                fromWalletId,
                toWalletId,
                amount,
            },
        }),
    ])

    res.json({ message: 'Transfer successful' })
}

export async function listTransactions(req: Request, res: Response) {
    if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    const userId = +req.userId
    const { startDate, endDate } = req.query

    console.log(userId, startDate, endDate)
    const transactions = await prisma.transaction.findMany({
        where: {
            OR: [{ fromWalletId: userId }, { toWalletId: userId }],
            createdAt: {
                gte: startDate ? new Date(startDate as string) : undefined,
                lte: endDate ? new Date(endDate as string) : undefined,
            },
        },
    })
    res.json({ transactions })
}
