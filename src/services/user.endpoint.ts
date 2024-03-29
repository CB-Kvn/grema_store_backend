import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { UserController } from "../controllers/user.controller";
import { ResponseApi } from "../interfaces/grema.interfaces";
import { Verified_Fields } from "../utils/verified_fields";

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
      const body = req.body;

      if (req.method !== "POST")
        return res.status(405).json({
          status: 405,
          msg: "Invalid Method",
          error: "Method is a POST but it send a " + req.method,
        });

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
        body
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

  async updateProfileEmail(req: Request, res: Response) {
    try {

      const body = req.body;

      const user = await prisma.profile.update({
        where: {
          userId: body.id,
        },
        data: {
          password: body.email,
        },
      });
      return res.status(200).json({ msg: "Estamos bien" });
    } catch (error) {
      return res.sendStatus(400);
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
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}
