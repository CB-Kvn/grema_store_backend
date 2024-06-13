import { Response, Request } from "express";
import { FiltersControllers } from "../controllers/filters.controller";
import { SendEmailController } from "../controllers/sendMail.controller";
import { confirmationNecesary } from "../templates/confirmationNecesary";
import { messageToClient } from "../templates/messageToClient";


const controller = new SendEmailController()

export class SendEmail {
    async sendEmail(req: Request, res: Response) {
        try {

            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });

                

           const body = req.body

            const response: any = await controller.SendEmail(body);

            if (response!.error) return res.status(response!.status!).json(response);

            return res.status(200).json(response);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

}
