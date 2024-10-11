import { Inventory, PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";
import { ResponseEnpoints } from "./sign.endpoint";

class FiltersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getFiltersStore(): Promise<ResponseEnpoints> {
    try {
      
      let resultados = {}
      const [productAttributes, categories] = await Promise.all([
        this.prisma.product.findMany({
          select: {
            color: true,
            shape: true,
            material: true,
            size: true,
          },
          distinct: ['color', 'shape', 'material', 'size'],
        }),
        this.prisma.category.findMany({
          distinct: ['name'],
          where: {
            status: "active",
          },
          select: {
            name: true,
          },
        }),
      ]);
      
      // Extraer valores únicos de cada atributo
      const colors = [...new Set(productAttributes.map(p => p.color))];
      const shapes = [...new Set(productAttributes.map(p => p.shape))];
      const materials = [...new Set(productAttributes.map(p => p.material))];
      const sizes = [...new Set(productAttributes.map(p => p.size))];
      
      const categoryNames = categories.map(c => c.name);

      resultados={colors, shapes, materials,sizes,categoryNames}

      logger.debug({message:"Sucessfully get data filter",data:resultados});
      return {message:"Sucessfully get data filter",data:resultados};
      
    } catch (error:any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching filter data');
    }
  }
}

export default FiltersService;