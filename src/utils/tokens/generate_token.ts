import { EntriesGenerateToken } from "../../interfaces/grema.interfaces";
import jwt from "jsonwebtoken";

export const generateTokens = (user: EntriesGenerateToken) => {

    if (user.option === "refresh") {
        const token_jwt = jwt.sign({ email: user.email }, process.env.JWT_GREMA as string, {
            expiresIn: '15m',
        });
        return { token_jwt }
    } else {
        const token_jwt = jwt.sign({ email: user.email }, process.env.JWT_GREMA as string, {
            expiresIn: '15m',
        });
        const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_GREMA as string, {
            expiresIn: '1d',
        });

        return { token_jwt, refreshToken }
    }


}
