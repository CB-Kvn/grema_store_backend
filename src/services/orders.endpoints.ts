import { Response, Request } from "express";
import { OrdersControllers } from "../controllers/orders.controller";

const controller = new OrdersControllers();
export class Orders {
    async Orders(req: Request, res: Response) {
        try {
            req.body;

            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });

            const response: any = await controller.Orders(req.body);

            if (response!.error) return res.status(response!.status!).json(response);

            return res.status(200).json(response);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

}
