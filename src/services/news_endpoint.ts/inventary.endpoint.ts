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
              status: "In Stock"
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
              status: "In Stock"
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
              status: "In Stock"
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
              status: "In Stock"
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
              status: "In Stock"
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

            include: {
              category: true
            }
          },
          // Incluye los detalles del producto en la respuesta
        },
      });

      if (!results) {
        logger.warn(`Not found products`);
        return { message: "Error:Not found products ", data: { results, totalItems } };

      }
      logger.warn({ message: "Succesfully get products", data: { results, totalItems } });
      return { message: "Succesfully get products", data: { results, totalItems } };
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
          status: "In Stock",
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
  public async getTopSellingProducts() {

    try {
      console.log("AQUI -2")
      const response = await this.prisma.invoiceDetail.findMany();

      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }

  }
  public async searchProducts(searchTerm: string) {
    return await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } }, // Busca por nombre
          { shape: { contains: searchTerm, mode: 'insensitive' } }, // Busca por forma
          { category: { name: { contains: searchTerm, mode: 'insensitive' } } }, // Busca por categoría
        ],
        product: { some: { quantity: { gt: 0 } } }, // Verifica que haya existencias en el inventario
      },
      include: {
        category: true, // Incluye la categoría
        product: { where: { quantity: { gt: 0 } } }, // Incluye solo productos con existencias
      },
    });
  }
  // Servicio para productos nuevos
  public async getNewProducts() {

    try {
      const response = await this.prisma.inventory.findMany({
        where: {
          quantity: { gt: 0 }, // Solo productos con existencias
        },

        orderBy: {
          createAtProductInventory: 'desc',
          //  createAtProduct: 'desc',
        },
        take: 8,
        include: {
          product: true
        }
      });

      return { message: "Succesfully get products", data: { response } };
    } catch (error: any) {
      logger.error(`Error fetching data: ${error.message}`);
    }

  }
  // Servicio para productos con descuento
  public async getDiscountedProducts() {

    try {

      logger.info("Aqui estoy");
      const response = await this.prisma.inventory.findMany({
        where: {
          status: "In Stock"
        },

      });

      return { message: "Succesfully get products", data: { response } };

    } catch (error: any) {
      logger.error(`Error fetching data: ${error.message}`);
    }


  }
  // Servicio para productos relacionados
  public async getRelatedProducts(productId: string) {
    logger.info(`Fetching related products for productId: ${productId}`);

    try {
        // 1. Obtener el producto actual con su categoría
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { category: true }, // Incluye la categoría para usarla en la búsqueda
        });

        logger.warn("Producto encontrado:");
        logger.warn(product);

        if (!product) {
            throw new Error('Product not found');
        }

        // 2. Obtener productos relacionados basados en la categoría del producto actual
        const relatedProducts = await this.prisma.product.findMany({
            where: {
                categoryId: product.categoryId, // Busca productos de la misma categoría
                NOT: { id: productId }, // Excluye el producto actual
            },
            take: 15, // Limita a 15 resultados
        });

        // 3. Verificar el inventario de cada producto relacionado
        const productsWithInventory = await Promise.all(
            relatedProducts.map(async (relatedProduct) => {
                const inventory = await this.prisma.inventory.findMany({
                    where: {
                        productId: relatedProduct.id, // Busca el inventario del producto
                        quantity: { gt: 0 }, // Solo inventario con existencias
                    },
                });

                // Si hay inventario disponible, agregamos el producto con su inventario
                if (inventory.length > 0) {
                    return {
                        ...relatedProduct,
                        inventory, // Agregamos el inventario al producto
                    };
                }

                return null; // Si no hay inventario, se devuelve null
            })
        );

        // 4. Filtrar productos que tienen inventario disponible
        const filteredRelatedProducts = productsWithInventory.filter(
            (product) => product !== null
        );

        return {
            message: "Successfully retrieved related products",
            data: { relatedProducts: filteredRelatedProducts },
        };
    } catch (error: any) {
        logger.error(`Error fetching related products: ${error.message}`);
        throw new Error(`Failed to fetch related products: ${error.message}`);
    }
}
}

export default InventaryService;