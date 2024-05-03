import { Response, Request } from "express";
import { ResponseApi } from "../interfaces/grema.interfaces";
import { PrismaClient } from "@prisma/client";
import { ShoppingController } from "../controllers/shoppingCar.controller";

const controller = new ShoppingController();
const prisma = new PrismaClient({});

export class ShoppingCar {
    
    async addShopping (req: Request, res: Response){
        try {
            const body = req.body;
      
            if (req.method !== "POST")
              return res.status(405).json({
                status: 405,
                msg: "Invalid Method",
                error: "Method is a POST but it send a " + req.method,
              });
          
      
            const response: ResponseApi | undefined = await controller.addShoppingController(
              body
            );
      
            if (response!.error) return res.status(response!.status!).json(response);
      
            return res.status(200).json(response);
          } catch (error) {
            return res.sendStatus(500);
          }
    }

    async removeShopping (req: Request, res: Response){
        try {
            const body = req.body;
      
            if (req.method !== "POST")
              return res.status(405).json({
                status: 405,
                msg: "Invalid Method",
                error: "Method is a POST but it send a " + req.method,
              });
          
      
            const response: ResponseApi | undefined = await controller.removeShoppingController(
              body
            );
      
            if (response!.error) return res.status(response!.status!).json(response);
      
            return res.status(200).json(response);
          } catch (error) {
            return res.sendStatus(500);
          }
    }

  
}