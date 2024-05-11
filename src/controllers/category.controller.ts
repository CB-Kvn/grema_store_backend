import { PrismaClient } from "@prisma/client";
import { CategoriesEntry, Catergories } from "../interfaces/grema.interfaces";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient({});
export class CategoriesController {
  async createCategories(_body: CategoriesEntry) {
    try {
      const response = _body.categories.map(async (element) => {
      const category = await prisma.category.create({
        data: {
          id : uuidv4(),
          name: element.name,
          status: true,
          createAtProfile:DateTime.now().setZone('America/Mexico_City').toString(),
          updateAtProfile:DateTime.now().setZone('America/Mexico_City').toString(),
          
        }
      });

    })

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
