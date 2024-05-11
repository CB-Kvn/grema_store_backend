import { PrismaClient } from "@prisma/client";
import { LoginProcess, Product, ProfilePassword, Users } from "../interfaces/grema.interfaces";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/tokens/generate_token";
import { DateTime } from "luxon";


const prisma = new PrismaClient({});
export class ProductController {

  async createProduct(_body: Product[]) {
    try {

      const productInv = _body
      const date = DateTime.now().setZone('America/Mexico_City').toString()
      const response = _body.map(async (element) => {
        let product = await prisma.inventory.create({
          data: {
            quantity: element.inventory.quantity,
            image: element.inventory.image,
            price: element.inventory.price,
            status: true,
            desc:element.inventory.desc,
            typeDesc:element.inventory.typeDesc,
            createAtProductInventory: date,
            updateAtProductInventory: date,
            product: {
              create: {
                name: element.name,
                description: element.description,
                material: element.material,
                size: element.size,
                shape: element.shape,
                categoryId: element.categoryId,
                color: element.color,
                createAtProduct: date,
                updateAtProduct: date,
              }
            }
          }
        });
        return product
      })

      return {
        success: "Ok",
        status: 201,
        msg: "New product create in db",
        data: { _body },
      };
    } catch (error: any) {
      if (error.code === "P2002")
        return {
          status: 409,
          msg: "Error create new product",
          info: "New product already exist",
          error: { ...error },
        };

      return {
        status: 400,
        msg: "Error create new product",
        error: { ...error },
      };
    }
  }
  async updateProduct(_body: any) {
    try {
      const user = await prisma.inventory.update({
        where: {
          id: _body.id,
        },
        data: {
          price: _body.price,
          desc:_body.desc,
          typeDesc:_body.typeDesc,
          product: {
            update: {
              name: _body.name,
              description: _body.description,
              material: _body.material,
              size: _body.size,
              color: _body.color,
              shape: _body.shape,
            }

          }
        },
      });
      return {
        success: "Ok",
        status: 200,
        msg: "Update product",
        data: _body,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error update product",
        error: { ...error },
      };
    }
  }
  async getAllProduct(_body: any) {
    try {
      const product = await prisma.inventory.findMany({
        
        where: {
          AND: [
              {
                status: true
              }
          ]

        },
        include: {

          product:{
            select:{
              id:true,
              name:true,
              description:true,
              material:true,
              size:true,
              shape:true,
              color:true,
              categoryId:true,
              category:{
                select:{
                  name:true,
                }
              }
            }
          }
        },
        skip: _body.skip,
        take: _body.take

      });
      return {
        success: "Ok",
        status: 200,
        msg: "Get all product",
        data: product,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error Get all product",
        error: { ...error },
      };
    }
  }
  async getAllFilters(_body: any) {
    try {
      const product = await prisma.inventory.findMany({

        where: {
          AND: [
            {
              product:{
                category: {
                  status: true
                },
              } 
            },
            {
             status: true
            },
            {
              product:{
                color: {
                  in: _body.color
                }
              }
            },
            {
              product:{
                material: {
                  in: _body.material
                }
              }
              
            },
            {
              product:{
                size: {
                  in: _body.tam
                }
              }
              
            },
            {
              product:{
                shape: {
                  in: _body.forma
                }
              }
              
            },
            {
              product:{
                category: {
                  name: {
                    in: _body.categoria
                  }
  
                },
              }
              
            },
          ]

        },
        include: {
          product:{
            select:{
              category:{
                select:{
                  name:true
                }
              },
              name:true,
              description:true,
              material:true,
              size:true,
              color:true,
              shape:true,

              
            }
            
          }
          
        },
        skip: _body.skip,
        take: _body.take


      });
      return {
        success: "Ok",
        status: 200,
        msg: "Get all product",
        data: product,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error Get all product",
        error: { ...error },
      };
    }
  }



}