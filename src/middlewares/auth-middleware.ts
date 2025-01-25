import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

type DecodedToken = {
    userId: string
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.replace('Bearer ', '')

    if (!token) {
        res.status(401).json({ message: 'Access denied' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: 'Invalid token' })
    }
}
