import { PrismaClient } from "@prisma/client";
import { Catergories } from "../interfaces/grema.interfaces";

const prisma = new PrismaClient({});
export class CategoriesController {
  async createCategories(_body: Catergories) {
    try {

      const category = await prisma.category.create({
        data: {
          name: _body.name,
          status: true
        },
      });

      return {
        success: "Ok",
        status: 201,
        msg: "New category create in db",
        data: { _body },
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error create category",
        error: { ...error },
      };
    }
  }

  async updateStatusCategory(_body: any) {
    try {
      const user = await prisma.category.update({
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
        msg: "Update status category",
        data: _body,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error status category",
        error: { ...error },
      };
    }
  }
  async getAllCategory(_body: any) {
    try {
      const categories = await prisma.category.findMany({
        
      });
      return {
        success: "Ok",
        status: 200,
        msg: "Get all category",
        data: categories,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error Get all category",
        error: { ...error },
      };
    }
  }
}
