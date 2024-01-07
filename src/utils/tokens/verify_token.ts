import { DateTime } from "luxon";
import { DecodeReponseJwt } from "../../interfaces/users.interfaces";
import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
    const actualDate2 = DateTime.now();
    const tk = process.env.GREMA;
    const decodedToken = jwt.verify(token, tk as string) as DecodeReponseJwt;
    const tokenDate = DateTime.fromSeconds(decodedToken.iat);
    const diff2 = actualDate2.diff(tokenDate, "hours");
    return Boolean(diff2.toObject()?.hours && diff2.toObject().hours! < 24);
};
