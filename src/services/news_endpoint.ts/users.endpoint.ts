import { PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";
import { ResponseEnpoints } from "./sign.endpoint";

class UsersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getUserInformation(_email:string): Promise<ResponseEnpoints> {
    try {
      
      const resultados = await this.prisma.profile.findUnique({
    
        where:{
            email:_email
        },
        include:{
            user:true
        }
      });
      
      logger.debug({message:"Sucessfully get data user",data:resultados});

      return {message:"Sucessfully get data user",data:resultados};
      
    } catch (error:any) {
      logger.error(`Error fetching data: ${error.message}`);
      throw new Error('Error fetching filter data');
    }
  }
}

export default UsersService;