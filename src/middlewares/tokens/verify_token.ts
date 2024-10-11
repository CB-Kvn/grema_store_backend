import { DateTime } from 'luxon';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { DecodeReponseJwt } from '../../../src/interfaces/grema.interfaces';

export const verifyTokenJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extraer token del encabezado de autorización
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const actualDate2 = DateTime.now().setZone('America/Mexico_City');
        const tk = process.env.JWT_GREMA;
        
        // Verificar el token
        const decodedToken = jwt.verify(token, tk as string) as DecodeReponseJwt;
        const tokenDate = DateTime.fromSeconds(decodedToken.iat);
        const diff2 = actualDate2.diff(tokenDate, "minutes");
        const dateVerified = Boolean(diff2.toObject()?.hours && diff2.toObject().hours! < 15);
        const email = decodedToken.email ? true : false;

        if (dateVerified || !email) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // El token es válido, pasamos al siguiente middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token', error });
    }
};
