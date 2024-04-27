import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
export class ErrorHandler extends Error {
    statusCode = 0
    constructor(statusCode: number, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

export const handleError = (err: ErrorHandler, req: Request, res: Response) => {
    const { statusCode, message } = err
    const errors = validationResult(req)
    res.setHeader('Strict-Transport-Security', 'max-age=31536000;includeSubDomains')
    res.status(statusCode).json({
        status: err.name,
        statusCode,
        message,
        errors: !errors.isEmpty ? errors.array() : null
    })
}