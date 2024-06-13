import { messageToClient } from "../templates/messageToClient";
import { MailInterface } from "../interfaces/grema.interfaces";
import { createConnectionEmail } from "../utils/emails/email_config";
import { confirmationNecesary } from "../templates/confirmationNecesary";

const transporter = createConnectionEmail()

export class SendEmailController {
    async SendEmail(body:any){

        try {

            let emailTemplate

            if (body.type === "msgToClient") {
                emailTemplate = messageToClient(body.text)
            } else {
                emailTemplate = confirmationNecesary(body.orderNumber,body.text)
             }
                

            const _body = {
                to: body.to,
                subject: body.subject,
                text: body.text,
                html: emailTemplate.html,
            }

            transporter.verify()
            transporter.sendMail({
                from: process.env.SMTP_USER,
                to:_body.to,
                text:_body.text,
                subject: _body.subject,
                html:_body.html
            })

            return {
                success: "Ok",
                status: 200,
                msg: "Mail send sucessfully",
                data: {},
              };
        } catch (error: any) {
            return {
                status: 400,
                msg: "Error to send email",
                error: { ...error },
              };
        }

    }
}