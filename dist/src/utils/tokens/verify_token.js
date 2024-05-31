"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndHeaders = void 0;
const luxon_1 = require("luxon");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyTokenAndHeaders = (token) => {
    try {
        const actualDate2 = luxon_1.DateTime.now().setZone('America/Mexico_City');
        const tk = process.env.GREMA;
        const decodedToken = jsonwebtoken_1.default.verify(token, tk);
        const tokenDate = luxon_1.DateTime.fromSeconds(decodedToken.iat);
        const diff2 = actualDate2.diff(tokenDate, "hours");
        const dateVerified = Boolean(diff2.toObject()?.hours && diff2.toObject().hours < 24);
        const userId = !decodedToken.userId ? false : true;
        return dateVerified === false || userId === false ? false : true;
    }
    catch (error) {
        return false;
    }
};
exports.verifyTokenAndHeaders = verifyTokenAndHeaders;
//# sourceMappingURL=verify_token.js.map