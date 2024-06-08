import { PrismaClient } from "@prisma/client";
import { Favorities_Cart, RemoveFav_Car, Shopping_Cart } from "../interfaces/grema.interfaces";

const prisma = new PrismaClient({});

export class ShoppingController {
    async addShoppingController(_body: Shopping_Cart) {
        try {

            const favorites = await prisma.favorites_Carts.create({
                data: {
                    id: _body.id,
                    userId: _body.userId,
                    quantity: _body.quantyOrder,
                    type: _body.type,
                    inventoryId: _body.inventoryId,
                    status: true
                },
            });

            return {
                success: "Ok",
                status: 201,
                msg: "New shopping create in db",
                data: { _body },
            };
        } catch (error: any) {
            return {
                status: 400,
                msg: "Error create shopping",
                error: { ...error },
            };
        }
    }
    async removeShoppingController(_body:RemoveFav_Car) {
        try {
    
          const shopping = await prisma.favorites_Carts.update({
              where:{
                id: _body.id,
                status:true
              },
              data:{
                status:false
              }
          });
    
          return {
            success: "Ok",
            status: 201,
            msg: "Remove shopping  in db",
            data: { shopping },
          };
        } catch (error: any) {
          return {
            status: 400,
            msg: "Error create category",
            error: { ...error },
          };
        }
      }
    // async getFavorities(_body: Favorities_Cart) {
    //     try {

    //         const favorities = await prisma.favorites_Carts.findMany({
    //             where: {
    //                 userId: _body.userId,
    //                 status: true
    //             },
    //             include: {
    //                 product: {
    //                     select: {
    //                         name: true,
    //                         product: {
    //                             select: {
    //                                 image: true,
    //                                 price: true,
    //                                 desc: true
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         });

    //         return {
    //             success: "Ok",
    //             status: 201,
    //             msg: "New category create in db",
    //             data: { favorities },
    //         };
    //     } catch (error: any) {
    //         return {
    //             status: 400,
    //             msg: "Error create category",
    //             error: { ...error },
    //         };
    //     }
    // }


}
