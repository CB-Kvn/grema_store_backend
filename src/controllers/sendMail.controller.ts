import { MailInterface } from "../interfaces/grema.interfaces";
import { createConnectionEmail } from "../utils/emails/email_config";

const transporter = createConnectionEmail()

export class SendEmailController {
    async SendEmail(_body:MailInterface){

        try {
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