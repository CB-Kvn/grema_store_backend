import { Inventory, PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";
import { ResponseEnpoints } from "./sign.endpoint";
import { v4 as uuidv4 } from 'uuid';


class InventaryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getProductsShowLanding(): Promise<ResponseEnpoints> {
    try {

      let resultados = {}

      const anillos = await this.prisma.inventory.findMany({
        where: {
          AND: [
            {
              product: {
                category: {
                  name: "Anillos"
                }
              }
            },
            {
              status: "active"
            }
          ]
        },
        include: {
          product: {
            select: {
              color: true,
              name: true,
              description: true,
              material: true,
              shape: true,
              size: true
            }
          }
        },
        orderBy: {
          product: {
            name: "desc"
          }
        },
        skip: 0,
        take: 5
      })
      const pulseras = await this.prisma.inventory.findMany({
        where: {
          AND: [
            {
              product: {
                category: {
                  name: "Pulseras"
                }
              }
            },
            {
              status: "active"
            }
          ]
        },
        include: {
          product: {
            select: {
              color: true,
              name: true,
              description: true,
              material: true,
              shape: true,
              size: true
            }
          }
        },
        orderBy: {
          product: {
            name: "desc"
          }
        },
        skip: 0,
        take: 5
      })
      const collares = await this.prisma.inventory.findMany({
        where: {
          AND: [
            {
              product: {
                category: {
                  name: "Collares"
                }
              }
            },
            {
              status: "active"
            }
          ]
        },
        include: {
          product: {
            select: {
              color: true,
              name: true,
              description: true,
              material: true,
              shape: true,
              size: true
            }
          }
        },
        orderBy: {
          product: {
            name: "desc"
          }
        },
        skip: 0,
        take: 5
      })
      const aretes = await this.prisma.inventory.findMany({
        where: {
          AND: [
            {
              product: {
                category: {
                  name: "Aretes"
                }
              }
            },
            {
              status: "active"
            }
          ]
        },
        include: {
          product: {
            select: {
              color: true,
              name: true,
              description: true,
              material: true,
              shape: true,
              size: true
            }
          }
        },
        orderBy: {
          product: {
            name: "desc"
          }
        },
        skip: 0,
        take: 5
      })
      const sets = await this.prisma.inventory.findMany({
        where: {
          AND: [
            {
              product: {
                category: {
                  name: "Sets"
                }
              }
            },
            {
              status: "active"
            }
          ]
        },
        include: {
          product: {
            select: {
              color: true,
              name: true,
              description: true,
              material: true,
              shape: true,
              size: true
            }
          }
        },
        orderBy: {
          product: {
            name: "desc"
          }
        },
        skip: 0,
        take: 5
      })

      resultados = {
        anillos,
        pulseras,
        collares,
        aretes,
        sets
      }

      if (!resultados) {
        logger.warn(`Not found products`);
        return { message: "Error:Not found products ", data: resultados };
      }

      return { message: "Succesfully get products", data: resultados };
    } catch (error: any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching user data');
    }
  }
  public async getProductsToStore(filters: any, offset: number, limit: number, status: string): Promise<ResponseEnpoints> {
    try {

      const totalItems = await this.prisma.inventory.count({
        where: {
          product: {
            ...(filters?.shapes?.length > 0 && { shape: { in: filters.shapes } }),
            ...(filters?.sizes?.length > 0 && { size: { in: filters.sizes } }),
            ...(filters?.categoryNames?.length > 0 && { category: { name: { in: filters.categoryNames } } }),
            ...(filters?.colors?.length > 0 && { color: { in: filters.colors } }),
            ...(filters?.materials?.length > 0 && { material: { in: filters.materials } }),
          },
          ...(status && { status }), // Condicional para incluir el status solo si está definido
        },
      });



      const results = await this.prisma.inventory.findMany({
        where: {
          product: {
            ...(filters?.shapes?.length > 0 && { shape: { in: filters.shapes } }),
            ...(filters?.sizes?.length > 0 && { size: { in: filters.sizes } }),
            ...(filters?.categoryNames?.length > 0 && { category: { name: { in: filters.categoryNames } } }),
            ...(filters?.colors?.length > 0 && { color: { in: filters.colors } }),
            ...(filters?.materials?.length > 0 && { material: { in: filters.materials } }),
          },
          ...(status && { status }), // Condicional para incluir el status solo si está definido
        },
        skip: offset,
        take: limit,
        include: {
          product: {
            
            include:{
              category:true
            }
          },
         // Incluye los detalles del producto en la respuesta
        },
      });

      if (!results) {
        logger.warn(`Not found products`);
        return { message: "Error:Not found products ", data: {results,totalItems} };

      }
      logger.warn({ message: "Succesfully get products", data: {results,totalItems}  });
      return { message: "Succesfully get products", data: {results,totalItems}  };
    } catch (error: any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching user data');
    }
  }
  public async getProductsDetailsToStore(id: string): Promise<Object | null> {
    try {

      const results = await this.prisma.inventory.findUnique({
        where: { id },
        include: {
          product: true,
        },
      });


      if (!results) {
        logger.warn(`Not found products`);
        return { message: "Error:Not found product ", data: results };

      }
      logger.warn({ message: "Succesfully get product", data: results });
      return { message: "Succesfully get product", data: results };

    } catch (error: any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching products data');
    }
  }
  public async postAddProducts(body: any): Promise<Object | null> {
    try {

      const idCategory = await this.prisma.category.findUnique({
        where: {
          name: body.categoria
        }
      })

      const products = await this.prisma.product.create({
        data: {
          id: uuidv4(),
          name: body.nombre,
          description: body.descripcion,
          material: body.material,
          size: body.size,
          shape: body.forma,
          categoryId: idCategory?.id!,
          color: body.color
        }
      });

      const inventary = await this.prisma.inventory.create({
        data: {
          id: uuidv4(),
          productId: products.id,
          quantity: Number(body.cantidad),
          image: body.imgs,
          price: body.precio,
          status: "active",
          typeDesc: "",
          desc: 0,
        }
      })


      if (!inventary) {
        logger.warn(`Not found products`);
        return { message: "Error:Not found product ", data: inventary };

      }
      logger.warn({ message: "Succesfully create product", data: inventary });
      return { message: "Succesfully create product", data: inventary };

    } catch (error: any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching products data');
    }
  }
}

export default InventaryService;