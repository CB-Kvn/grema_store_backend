"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnectionEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const createConnectionEmail = () => {
    const transporter = nodemailer_1.default.createTransport({
        service: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PWD
        }
    });
    return transporter;
};
exports.createConnectionEmail = createConnectionEmail;
//# sourceMappingURL=email_config.js.map