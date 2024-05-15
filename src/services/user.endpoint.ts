import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { UserController } from "../controllers/user.controller";
import { ResponseApi } from "../interfaces/grema.interfaces";
import { Verified_Fields } from "../utils/validations/verified_fields";
import { cloudinaryUpload } from "../utils/upload/upload_handler";

import { v4 as uuidv4 } from 'uuid';

const controller = new UserController();
const prisma = new PrismaClient({});
export class UsersEndpoint {
  async getUser(req: Request, res: Response) {
    try {
      return res.status(200).json({ msg: "Estamos bien" });
    } catch (error) {
      return res.sendStatus(400);
    }
  }
  async createNewUser(req: Request, res: Response) {
    try {
      const body = JSON.parse(JSON.stringify(req.body));

      if (req.method !== "POST")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a POST but it send a " + req.method,
        });

      let urlList: string[] = []

      if (req.files && req.files.length !== 0) {
        urlList = await cloudinaryUpload(req.files! as Express.Multer.File[])
        console.log(urlList)
      } else {
        urlList.push("https://res.cloudinary.com/denqtcsyy/image/upload/f_auto,q_auto/v1/users-profile/a0tysxy6wukagduank4k")
        console.log('No hay imagenes')
      }


      //Evalua que los parametros enviado en la consulta se encunetren bien
      const validate: ResponseApi | undefined = Verified_Fields(
        body,
        "createNewUser"
      );

      if (!validate!.validate) {
        return res.status(validate!.status!).json({
          status: validate!.status,
          msg: validate!.msg,
          error: validate!.error,
        });
      }

      const response: ResponseApi | undefined = await controller.createNewUser(
        body,
        urlList
      );

      if (response!.error) return res.status(response!.status!).json(response);

      return res.status(200).json(response);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const body = req.body;
      if (req.method !== "PUT")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a PUT but it send a " + req.method,
        });



      const response: any = await controller.deleteUser(
        body
      );

      if (response!.error) return res.status(response!.status!).json(response);

      return res.status(200).json(response);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async updateProfilePassword(req: Request, res: Response) {
    try {
      const body = req.body;
      if (req.method !== "PUT")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a PUT but it send a " + req.method,
        });

      const validate: ResponseApi | undefined = Verified_Fields(
        body,
        "updateProfilePassword"
      );

      if (!validate!.validate) {
        return res.status(validate!.status!).json({
          status: validate!.status,
          msg: validate!.msg,
          error: validate!.error,
        });
      }

      const response: any = await controller.updateProfilePassword(
        body
      );

      if (response!.error) return res.status(response!.status!).json(response);

      return res.status(200).json(response);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const body = req.body;
      if (req.method !== "PUT")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a PUT but it send a " + req.method,
        });

        const response: ResponseApi | undefined = await controller.updateUser(
          body
        );
  
        if (response!.error) return res.status(response!.status!).json(response);
  
        return res.status(200).json(response);
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  async verifyPassword(req: Request, res: Response) {

    try {

      const body = req.body;

      if (req.method !== "PUT")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a POST but it send a " + req.method,
        });

      const response: ResponseApi | undefined = await controller.verifyPassword(
        body
      );

      if (response!.error) return res.status(response!.status!).json(response);

      return res.status(200).json(response);

    } catch (error) {
      return res.sendStatus(500);
    }

  }

  async loginUser(req: Request, res: Response) {
    try {
      const body = req.body;

      if (req.method !== "POST")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a POST but it send a " + req.method,
        });

      const guest = req.headers.guest

      if (!guest) {
        const validate: ResponseApi | undefined = Verified_Fields(
          body,
          "loginUser"
        );

        if (!validate!.validate) {
          return res.status(validate!.status!).json({
            status: validate!.status,
            msg: validate!.msg,
            error: validate!.error,
          });
        }

        const response: ResponseApi | undefined = await controller.loginUser(
          body
        );

        if (response!.error) return res.status(response!.status!).json(response);

        return res.status(200).json(response);
      } else {
        const body = uuidv4()
        const response: ResponseApi | undefined = await controller.loginGuest(
          body!
        );

        if (response!.error) return res.status(response!.status!).json(response);

        return res.status(200).json(response);
      }

    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async loginGuest(req: Request, res: Response) {
    try {
      const body = req.headers.userguest as string

      if (req.method !== "POST")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a POST but it send a " + req.method,
        });



    } catch (error) {
      return res.sendStatus(500);
    }
  }

  async refreshGuestToken(req: Request, res: Response) {
    try {
      const body = req

      if (req.method !== "POST")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a POST but it send a " + req.method,
        });


      const response = await controller.refreshToken(body);

      return res.status(200).json(response);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}
