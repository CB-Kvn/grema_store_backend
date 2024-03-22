import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export class FiltersControllers {
    async getAllFilters() {
        try {
          const color = await prisma.product.findMany({
            distinct:['color'],
            select:{
                color:true,  
            },
          });
          const shape = await prisma.product.findMany({
            distinct:['shape'],
            select:{
                shape:true,  
            },
          });
          const material = await prisma.product.findMany({
            distinct:['material'],
            select:{
                material:true,  
            },
          });
          const size = await prisma.product.findMany({
            distinct:['size'],
            select:{
                size:true,  
            },
          });

          const category = await prisma.category.findMany({
            distinct:['name'],
            where:{
                status:true
            },
            select:{
                name:true
            }
          });



          return {
            success: "Ok",
            status: 200,
            msg: "Get all filters",
            data: {color,shape,size,material,category},
          };
        } catch (error: any) {
          return {
            status: 400,
            msg: "Error Get all filters",
            error: { ...error },
          };
        }
      }
}