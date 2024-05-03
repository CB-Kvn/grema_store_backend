import { EntriesGenerateToken } from "../../interfaces/grema.interfaces";
import jwt from "jsonwebtoken";

export const generateToken = (user:EntriesGenerateToken) => {
    const tk = process.env.GREMA
    const token = jwt.sign({ userId: user.userId, email: user.email}, tk as string, {
        expiresIn: '3d',
        });
    return token
}
