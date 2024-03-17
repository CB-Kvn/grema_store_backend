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
          description: _body.description ,
          material: _body.material ,
          size:_body.size ,
          categoryId: _body.categoryId ,
          price: _body.price,
          status: true
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
          info: "User already exist",
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


}