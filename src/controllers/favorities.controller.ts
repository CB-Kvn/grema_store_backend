import { PrismaClient } from "@prisma/client";
import { Favorities_Cart, RemoveFav_Car } from "../interfaces/grema.interfaces";

const prisma = new PrismaClient({});

export class FavoritiesController {
  async addFavorities(_body: Favorities_Cart) {
    try {

      const favorites = await prisma.favorites_Carts.create({
        data: {
          id:_body.id,
          userId:_body.userId,
          quantity:_body.quantyOrder,
          type:_body.type,
          productId:_body.productId,
          status: true
        },
      });

      return {
        success: "Ok",
        status: 201,
        msg: "New favorite create in db",
        data: { _body },
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error create favorite",
        error: { ...error },
      };
    }
  }
  async removeFavorities(_body:RemoveFav_Car) {
    try {

      const favorities = await prisma.favorites_Carts.update({
          where:{
            id: _body.id
          },
          data:{
            status:false
          }
      });

      return {
        success: "Ok",
        status: 201,
        msg: "Remove favorite in db",
        data: { favorities },
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error create favorite",
        error: { ...error },
      };
    }
  }

  async getFavorities(_body: Favorities_Cart) {
    try {

      const favorities = await prisma.favorites_Carts.findMany({
          where:{
            userId:_body.userId,
            status:true
          },
          include:{
            product:{
              select:{
                name:true,
                product:{
                  select:{
                    image:true,
                    price:true,
                    desc:true
                  }
                }
              }
            }
          }
      });

      return {
        success: "Ok",
        status: 201,
        msg: "New category create in db",
        data: { favorities },
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error create category",
        error: { ...error },
      };
    }
  }

  
}
