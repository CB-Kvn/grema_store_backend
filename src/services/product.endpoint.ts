import { Response, Request } from "express";
import { ResponseApi } from "../interfaces/grema.interfaces";
import { PrismaClient } from "@prisma/client";
import { ProductController } from "../controllers/product.controller";
import multer from "multer";

const controller = new ProductController();
const prisma = new PrismaClient({});

export class Product {
    
    async createProduct (req: Request, res: Response){
        try {
            const body = req.body;

      
            if (req.method !== "POST")
              return res.status(405).json({
                status: 405,
                msg: "Invalid Method",
                error: "Method is a POST but it send a " + req.method,
              });
          
      
            const response: ResponseApi | undefined = await controller.createProduct(
              body
            );
      
            if (response!.error) return res.status(response!.status!).json(response);
      
            return res.status(200).json(response);
          } catch (error) {
            return res.sendStatus(500);
          }
    }
    async updateProduct(req: Request, res: Response) {
      try {
        const body = req.body;
        if (req.method !== "PUT")
          return res.status(405).json({
            status: 405,
            msg: "Invalid Method",
            error: "Method is a PUT but it send a " + req.method,
          });

        const response: ResponseApi = await controller.updateProduct(
          body
        );
  
        if (response!.error) return res.status(response!.status!).json(response);
  
        return res.status(200).json(response);
      } catch (error) {
        return res.sendStatus(500);
      }
    }
    // async updateProductStatus(req: Request, res: Response) {
    //   try {
    //     const body = req.body;
    //     if (req.method !== "PUT")
    //       return res.status(405).json({
    //         status: 405,
    //         msg: "Invalid Method",
    //         error: "Method is a PUT but it send a " + req.method,
    //       });

    //     const response: any= await controller.updateProductStatus(
    //       body
    //     );
  
    //     if (response!.error) return res.status(response!.status!).json(response);
  
    //     return res.status(200).json(response);
    //   } catch (error) {
    //     return res.sendStatus(500);
    //   }
    // }
    async getAllFilters (req: Request, res: Response) {
      try {
        const body = req.body;
        if (req.method !== "POST")
          return res.status(405).json({
            status: 405,
            msg: "Invalid Method",
            error: "Method is a POST but it send a " + req.method,
          });

        const response: ResponseApi = await controller.getAllFilters(body);
  
        if (response!.error) return res.status(response!.status!).json(response);
  
        return res.status(200).json(response);
      } catch (error) {
        return res.sendStatus(500);
      }
    }
    async getUniqueProduct (req: Request, res: Response) {
      try {
        const { id } = req.params;

        console.log(id)

        if (req.method !== "GET")
          return res.status(405).json({
            status: 405,
            msg: "Invalid Method",
            error: "Method is a PUT but it send a " + req.method,
          });

        const response: ResponseApi = await controller.getUniqueProduct(id);
  
        if (response!.error) return res.status(response!.status!).json(response);
  
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching inventory' });
      }
    }
    async getShowProducts (req: Request, res: Response) {
      try {
        if (req.method !== "GET")
          return res.status(405).json({
            status: 405,
            msg: "Invalid Method",
            error: "Method is a GET but it send a " + req.method,
          });

        const response: ResponseApi = await controller.getAlternatives()
  
        if (response!.error) return res.status(response!.status!).json(response);
  
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching inventory' });
      }
    }



  
}