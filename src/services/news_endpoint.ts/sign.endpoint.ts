import { PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";

import bcrypt from "bcrypt"

export interface ResponseEnpoints {
    message:string,
    data: any
}

class SignService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async postCreateUser(userData:any): Promise<ResponseEnpoints> {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
      
            const user = await this.prisma.users.create({
                data: {
                    id: userData.personal.id.toString(),
                    name: userData.personal.name,
                    cellphone: userData.personal.phone,
                    status: true,
                    profile: {
                      create: {
                        email: userData.personal.email,
                        password: hashedPassword,
                        country:userData.address.country,
                        addressComplete:  `${userData.address.address},${userData.address.country},${userData.address.province},${userData.address.canton}`,
                        province:userData.address.province,          
                        canton:userData.address.canton,           
                        postal:userData.address.codigoPostal,            
                        image: userData.imgs[0],
                        rolId:2
                       },
                    },
                  },
                  include:{
                    profile:{
                      select:{
                        province:true,
                        addressComplete: true,
                        canton:true,
                        country:true,
                        provinceFac:true,
                        addressCompleteFac: true,
                        cantonFac:true,
                        image:true,
                        email:true,
                        rolId:true,
                        rol:{
                          select:{
                            name:true
                          }
                        }
                      }
                    }
                  }
            });
        
            // Manejar los detalles de la orden

        
            return { message: "User created successfully", data: user };
          } catch (error: any) {
            logger.error(`Error created user: ${error.message}`);
            throw new Error("Error created user");
          }
    }
}

export default SignService;