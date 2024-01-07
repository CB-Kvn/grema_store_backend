import { EntriesGenerateToken } from "../../interfaces/users.interfaces";
import jwt from "jsonwebtoken";

export const generateToken = (user:EntriesGenerateToken) => {
    const tk = process.env.GREMA
    const token = jwt.sign({ userId: user.userId, email: user.email, password: user.password }, tk as string, {
        expiresIn: '1d',
        });
    return token
}
