import { Response, Request } from "express";
import { OrdersControllers } from "../controllers/orders.controller";
import { ResponseApi } from "../interfaces/grema.interfaces";
import { SendEmail } from "./sendEmail.endpoint";
import { SendEmailController } from "../controllers/sendMail.controller";

const controller = new OrdersControllers();
const controllerEmail = new SendEmailController()

export class Orders {
    async Orders(req: Request, res: Response) {
        try {
            req.body;

            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });

            const response: any = await controller.Orders(req.body);

            if (response!.error) return res.status(response!.status!).json(response);

            const responseEmail = await controllerEmail.SendEmail(req.body)

            if (response!.error || responseEmail.error! ) return res.status(response!.status! || responseEmail!.status!).json(response||responseEmail);

            return res.status(200).json(response);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
    async confirmationOrder(req: Request, res: Response) {
        try {
          const body = JSON.parse(JSON.stringify(req.body));
    
          if (req.method !== "POST")
            return res.status(405).json({
              status: 405,
              msg: "Invalid Method",
              error: "Method is a POST but it send a " + req.method,
            });


          const response: ResponseApi | undefined = await controller.ConfirmationOrders(
            body,
          );
    
          if (response!.error) return res.status(response!.status!).json(response);
    
          return res.status(200).json(response);
        } catch (error) {
          return res.sendStatus(500);
        }
      }

}
