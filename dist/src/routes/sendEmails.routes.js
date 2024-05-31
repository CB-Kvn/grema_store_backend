"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const sendEmail_endpoint_1 = require("../services/sendEmail.endpoint");
exports.router = express_1.default.Router();
const endpoint = new sendEmail_endpoint_1.SendEmail();
exports.router.all('/email-confirmation', endpoint.sendEmail);
//# sourceMappingURL=sendEmails.routes.js.map