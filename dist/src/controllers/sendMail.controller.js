"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailController = void 0;
const email_config_1 = require("../utils/emails/email_config");
const transporter = (0, email_config_1.createConnectionEmail)();
class SendEmailController {
    async SendEmail(_body) {
        try {
            transporter.verify();
            transporter.sendMail({
                from: process.env.SMTP_USER,
                to: _body.to,
                text: _body.text,
                subject: _body.subject,
                html: _body.html
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Mail send sucessfully",
                data: {},
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error to send email",
                error: { ...error },
            };
        }
    }
}
exports.SendEmailController = SendEmailController;
//# sourceMappingURL=sendMail.controller.js.map