
import jwt from 'jsonwebtoken';

export const verifyTokenRefresh = (refreshToken: string, secret: string) => {
    try {
        const decoded = jwt.verify(refreshToken, secret);
        return { valid: true, decoded };
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return { valid: false, message: 'Refresh token has expired' };
        }
        if (err.name === 'JsonWebTokenError') {
            return { valid: false, message: 'Invalid refresh token' };
        }
        // Error genérico de verificación
        return { valid: false, message: 'Could not verify refresh token' };
    }
};