import { Inventory, PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";
import { ResponseEnpoints } from "./sign.endpoint";

class InventaryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getProductsShowLanding(): Promise<ResponseEnpoints> {
    try {
      
      let resultados = {}

      const anillos = await this.prisma.inventory.findMany({
        where:{
          AND:[
            {
              product:{
                category:{
                  name:"Anillos"
                }
              }
            },
            {
              status:"active"
            }
          ]
        },
        include:{
          product:{
            select:{
              color:true,
              name:true,
              description:true,
              material:true,
              shape:true,
              size:true              
            }
          }
        },
        orderBy:{
          product:{
            name:"desc"
          }          
        },
        skip:0,
        take:5        
      })
      const pulseras = await this.prisma.inventory.findMany({
        where:{
          AND:[
            {
              product:{
                category:{
                  name:"Pulseras"
                }
              }
            },
            {
              status:"true"
            }
          ]
        },
        include:{
          product:{
            select:{
              color:true,
              name:true,
              description:true,
              material:true,
              shape:true,
              size:true              
            }
          }
        },
        orderBy:{
          product:{
            name:"desc"
          }          
        },
        skip:0,
        take:5        
      })
      const collares = await this.prisma.inventory.findMany({
        where:{
          AND:[
            {
              product:{
                category:{
                  name:"Collares"
                }
              }
            },
            {
               status:"true"
            }
          ]
        },
        include:{
          product:{
            select:{
              color:true,
              name:true,
              description:true,
              material:true,
              shape:true,
              size:true              
            }
          }
        },
        orderBy:{
          product:{
            name:"desc"
          }          
        },
        skip:0,
        take:5        
      })
      const aretes = await this.prisma.inventory.findMany({
        where:{
          AND:[
            {
              product:{
                category:{
                  name:"Aretes"
                }
              }
            },
            {
               status:"true"
            }
          ]
        },
        include:{
          product:{
            select:{
              color:true,
              name:true,
              description:true,
              material:true,
              shape:true,
              size:true              
            }
          }
        },
        orderBy:{
          product:{
            name:"desc"
          }          
        },
        skip:0,
        take:5        
      })
      const sets = await this.prisma.inventory.findMany({
        where:{
          AND:[
            {
              product:{
                category:{
                  name:"Sets"
                }
              }
            },
            {
               status:"true"
            }
          ]
        },
        include:{
          product:{
            select:{
              color:true,
              name:true,
              description:true,
              material:true,
              shape:true,
              size:true              
            }
          }
        },
        orderBy:{
          product:{
            name:"desc"
          }          
        },
        skip:0,
        take:5        
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
        return {message:"Error:Not found products ", data:resultados};
      }

      return {message:"Succesfully get products", data:resultados};
    } catch (error:any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching user data');
    }
  }
  public async getProductsToStore(filters:any,offset:number,limit:number, status:string): Promise<ResponseEnpoints> {
    try {
      

      

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
          product: true, // Incluye los detalles del producto en la respuesta
        },
      });

      if (!results) {
        logger.warn(`Not found products`);
        return {message:"Error:Not found products ", data:results};
      
      }
      logger.warn({message:"Succesfully get products", data:results});
      return {message:"Succesfully get products", data:results};
    } catch (error:any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching user data');
    }
  }
  public async getProductsDetailsToStore(id:string): Promise<Object | null> {
    try {
      
      const results = await this.prisma.inventory.findUnique({
        where: { id },
        include: {
          product: true,
        },
      });

     
      if (!results) {
        logger.warn(`Not found products`);
        return {message:"Error:Not found product ", data:results};
      
      }
      logger.warn({message:"Succesfully get product", data:results});
      return {message:"Succesfully get product", data:results};

    } catch (error:any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching products data');
    }
  }
}

export default InventaryService;