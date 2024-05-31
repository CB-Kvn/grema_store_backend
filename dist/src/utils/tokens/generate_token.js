"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const tk = process.env.GREMA;
    const token = jsonwebtoken_1.default.sign({ userId: user.userId, email: user.email }, tk, {
        expiresIn: '3d',
    });
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=generate_token.js.map