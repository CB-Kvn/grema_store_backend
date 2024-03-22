import { Response, Request } from "express";
import { FiltersControllers } from "../controllers/filters.controller";


const controller = new FiltersControllers();
export class Filters {
    async getAllFilters(req: Request, res: Response) {
        try {

            if (req.method !== "GET")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });

            const response: any = await controller.getAllFilters();

            if (response!.error) return res.status(response!.status!).json(response);

            return res.status(200).json(response);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

}
