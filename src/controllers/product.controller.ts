import { PrismaClient } from "@prisma/client";
import { LoginProcess, ProfilePassword, Users } from "../interfaces/grema.interfaces";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/tokens/generate_token";


const prisma = new PrismaClient({});
export class ProductController {

  async createProduct(_body: any) {
    try {

      const user = await prisma.product.create({
        data: {
          name: _body.name,
          description: _body.description,
          material: _body.material,
          size: _body.size,
          categoryId: _body.categoryId,
          price: _body.price,
          status: true,
          color: _body.color,
          shape: _body.shape
        },
      });

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
      const user = await prisma.product.update({
        where: {
          id: _body.id,
        },
        data: {
          name: _body.name,
          description: _body.description,
          material: _body.material,
          size: _body.size,
          price: _body.price,
          color: _body.color,
          shape: _body.shape
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
  async updateProductStatus(_body: any) {
    try {
      const user = await prisma.product.update({
        where: {
          id: _body.id,
        },
        data: {
          status: _body.status,
        },
      });
      return {
        success: "Ok",
        status: 200,
        msg: "Update status product",
        data: _body,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error update status product",
        error: { ...error },
      };
    }
  }
  async getAllProduct(_body:any) {
    try {
      const product = await prisma.product.findMany({

        where: {
          AND: [
            {
              category: {
                status: true

              },
            },
            {
              status: true
            }
          ]

        },
        include: {
          category: {
            select: {
              name: true
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
      const product = await prisma.product.findMany({

        where: {
          AND: [
            {
              category: {
                status: true

              },
            },
            {
              status: true
            },
            {
              color: {
                in: _body.colors
              }
            },
            {
              material: {
                in: _body.materials
              }
            },
            {
              size: {
                in: _body.sizes
              }
            },
            {
              category: {
                name: {
                  in: _body.names
                }

              },
            },
          ]

        },
        include: {
          category: {
            select: {
              name: true
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