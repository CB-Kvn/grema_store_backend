import { Response, Request } from "express";
import { ResponseApi } from "../interfaces/grema.interfaces";
import { PrismaClient } from "@prisma/client";
import { CategoriesController } from "../controllers/category.controller";

const controller = new CategoriesController();
const prisma = new PrismaClient({});

export class Categories {
    
    async createCategories (req: Request, res: Response){
        try {
            const body = req.body;
      
            if (req.method !== "POST")
              return res.status(405).json({
                status: 405,
                msg: "Invalid Method",
                error: "Method is a POST but it send a " + req.method,
              });
          
      
            const response: ResponseApi | undefined = await controller.createCategories(
              body
            );
      
            if (response!.error) return res.status(response!.status!).json(response);
      
            return res.status(200).json(response);
          } catch (error) {
            return res.sendStatus(500);
          }
    }

    async updateStatusCategory(req: Request, res: Response) {
      try {
        const body = req.body;
        if (req.method !== "PUT")
          return res.status(405).json({
            status: 405,
            msg: "Invalid Method",
            error: "Method is a PUT but it send a " + req.method,
          });

        const response: any= await controller.updateStatusCategory(
          body
        );
  
        if (response!.error) return res.status(response!.status!).json(response);
  
        return res.status(200).json(response);
      } catch (error) {
        return res.sendStatus(500);
      }
    }
  
}