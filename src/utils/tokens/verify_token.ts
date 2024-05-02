import { DateTime } from "luxon";
import { DecodeReponseJwt } from "../../interfaces/grema.interfaces";
import jwt from "jsonwebtoken";

export const verifyTokenAndHeaders = (token: string) => {

    try {
        const actualDate2 = DateTime.now().setZone('America/Mexico_City');
        const tk = process.env.GREMA;
        const decodedToken = jwt.verify(token, tk as string) as DecodeReponseJwt;
        const tokenDate = DateTime.fromSeconds(decodedToken.iat);
        const diff2 = actualDate2.diff(tokenDate, "hours");
        const dateVerified = Boolean(diff2.toObject()?.hours && diff2.toObject().hours! < 24);
        const userId = !decodedToken.userId ? false: true  

        return dateVerified === false || userId === false  ? false : true

    } catch (error) {
        return false
    }

};
