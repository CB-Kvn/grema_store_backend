import { PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";
import { ResponseEnpoints } from "./sign.endpoint";
import bcrypt from "bcrypt"

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
  public async getVerityPassword(password: string, id: string): Promise<ResponseEnpoints> {
    try {
        const resultados = await this.prisma.profile.findFirst({
            where: {
                userId: id,
            },
            include: {
                user: true,
            },
        });

        if (!resultados) {
            logger.warn(`No se encontró información para el usuario con ID: ${id}`);
            throw new Error('No se encontró información del usuario');
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isValid = await bcrypt.compare(password, resultados.password!);

        if (!isValid) {
            logger.warn({ message: "La contraseña actual es incorrecta", userId: id });
            return { message: "La contraseña actual es incorrecta", data: null };
        }

        logger.debug({ message: "Datos del usuario obtenidos exitosamente", data: resultados });

        return { message: "Datos del usuario obtenidos exitosamente", data: resultados };

    } catch (error: any) {
        logger.error(`Error al verificar la contraseña: ${error.message}`);
        throw new Error('Error al verificar la contraseña');
    }
}
}

export default UsersService;