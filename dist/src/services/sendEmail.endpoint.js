"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const sendMail_controller_1 = require("../controllers/sendMail.controller");
const confirmationNecesary_1 = require("../templates/confirmationNecesary");
const controller = new sendMail_controller_1.SendEmailController();
class SendEmail {
    async sendEmail(req, res) {
        try {
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const emailTemplate = (0, confirmationNecesary_1.confirmationNecesary)();
            const _body = {
                to: req.body.to,
                subject: req.body.subject,
                text: req.body.text,
                html: emailTemplate.html,
            };
            const response = await controller.SendEmail(_body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.SendEmail = SendEmail;
//# sourceMappingURL=sendEmail.endpoint.js.map