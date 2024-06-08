import { PrismaClient } from "@prisma/client";
import { DeleteUser, LoginProcess, ProfilePassword, Users, UsersUpdate } from "../interfaces/grema.interfaces";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/tokens/generate_token";
import { request, Request } from "express";
import { verifyTokenAndHeaders } from "../utils/tokens/verify_token";
import { DateTime } from "luxon";
import { body } from "express-validator";

const prisma = new PrismaClient({});
export class UserController {
  async getUser() {
    try {
      console.log(
        "Sirve para llamar a la base de datos o los diferents metodos para el tratamiento de informacion"
      );
    } catch (error) { }
  }
  async createNewUser(_body: Users, urlList: string[]) {
    try {
      const hashedPassword = await bcrypt.hash(_body.profile.password, 10);
      const user = await prisma.users.create({
        data: {
          id: _body.id.toString(),
          name: _body.name,
          cellphone: _body.cellphone,
          createAtUsers: DateTime.now().setZone('America/Mexico_City').toString(),
          updateAtUsers: DateTime.now().setZone('America/Mexico_City').toString(),
          genre: _body.genre,
          status: true,
          profile: {
            create: {
              email: _body.profile.email,
              password: hashedPassword,
              address: _body.profile.address,
              image: urlList[0],
              createAtProfile: DateTime.now().setZone('America/Mexico_City').toString(),
              updateAtProfile: DateTime.now().setZone('America/Mexico_City').toString()
            },
          },
        },
      });

      return {
        success: "Ok",
        status: 201,
        msg: "New user create in db",
        data: { _body },
      };
    } catch (error: any) {
      if (error.code === "P2002")
        return {
          status: 409,
          msg: "Error create new user",
          info: "User already exist",
          error: { ...error },
        };

      return {
        status: 400,
        msg: "Error create new user",
        error: { ...error },
      };
    }
  }
  async updateUser(_body: UsersUpdate) {
    try {

      const user = await prisma.users.update({
        where: {
          id: _body.id
        },
        data: {
          cellphone: _body.phone,
          profile: {
            update: {
              address: _body.address,
              createAtProfile: DateTime.now().setZone('America/Mexico_City').toString(),
              updateAtProfile: DateTime.now().setZone('America/Mexico_City').toString()
            },
          },
        },
        select:{
          cellphone:true,
          profile:{
            select:{
              address:true
            }
          }
        }
      })

      return {
        success: "Ok",
        status: 201,
        msg: "Update profile",
        data: { user },
      };
    } catch (error: any) {
      if (error.code === "P2002")
        return {
          status: 409,
          msg: "Error update profile",
          info: "",
          error: { ...error },
        };

      return {
        status: 400,
        msg: "Error update profile",
        error: { ...error },
      };
    }
  }

  async deleteUser(_body: DeleteUser) {
    try {
      const user = await prisma.users.update({
        where: {
          id: _body.id.toString()
        },
        data: {
          status: false,
        },
      });
      return {
        success: "Ok",
        status: 200,
        msg: "Delete profile",
        data: _body,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error delete profile",
        error: { ...error },
      };
    }
  }
  async updateProfilePassword(_body: ProfilePassword) {
    try {
      const user = await prisma.profile.update({
        where: {
          userId: _body.id,
        },
        data: {
          password: _body.password,
          updateAtProfile: DateTime.now().setZone('America/Mexico_City').toString()
        },
      });
      return {
        success: "Ok",
        status: 200,
        msg: "Update password in profile",
        data: _body,
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error update profile",
        error: { ...error },
      };
    }
  }

  async loginUser(_body: LoginProcess) {
    try {



      const result = await prisma.profile.findFirst({
        where: {
          AND: [
            {
              email: _body.email,
            },
            {
              user: {
                status: true
              }
            }

          ]
        },

        select: {
          userId: true,
          password: true,
          address: true,
          createAtProfile: true,
          email: true,
          id: true,
          image: true,
          updateAtProfile: true,
          user: {
            select: {
              id: true,
              name: true,
              cellphone: true,

            }
          }

        },

      })

      if (!result) {
        return {
          status: 204,
          msg: "User not found",
        };
      }

      const verifiedPassword = await bcrypt.compare(_body.password, result.password)

      if (!verifiedPassword) {
        return {
          status: 204,
          msg: "Invalid password",
        };
      }

      return {
        success: "Ok",
        status: 200,
        msg: "Found User",
        data: {
          email: result.email,
          address: result.address,
          phone: result.user.cellphone,
          name: result.user.name,
          userId: result.user.id,
          image: result.image,
          token: generateToken({
            userId: result.id,
            email: result.email
          }),
          type: "inscript",
          profileId: result.id
        },
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error search user",
        error: { ...error },
      };
    }
  }

  async verifyPassword(_body: LoginProcess) {
    try {



      const result = await prisma.profile.findFirst({
        where: {
          email: _body.email,
        },
        select: {
          password: true,
          address: true,
        },

      })

      if (!result) {
        return {
          status: 204,
          msg: "User not found",
        };
      }

      const verifiedPassword = await bcrypt.compare(_body.password, result.password)

      if (!verifiedPassword) {
        return {
          status: 204,
          msg: "Invalid password",
        };
      }

      const finalResult = await prisma.profile.update({
        where: {
          email: _body.email,
        },
        data: {
          password: _body.passordNew,
          updateAtProfile: DateTime.now().setZone('America/Mexico_City').toString()
        }
      })

      return {
        success: "Ok",
        status: 200,
        msg: "Update passord",
        data: {
          body: _body,
          result: finalResult
        },
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error update password",
        error: { ...error },
      };
    }
  }

  async loginGuest(_body: string) {
    try {



      const result = generateToken({ userId: _body, email: "" })

      if (!result) {
        return {
          status: 204,
          msg: "User not found",
        };
      }


      return {
        success: "Ok",
        status: 200,
        msg: "Found User",
        data: {
          email: "",
          userId: _body,
          image: "",
          token: result,
          type: "guest"
        },
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error search user",
        error: { ...error },
      };
    }
  }

  async refreshToken(req: Request) {

    try {
      const { headers } = req
      const id = headers.user as string
      const email = headers.email as string
      const image = headers.image as string
      let result



      return {
        success: "Ok",
        status: 200,
        msg: "Token generate",
        data: {
          email: email,
          userId: id,
          image: image,
          token: generateToken({
            userId: id,
            email: email
          }),
          type: "inscript"
        },
      };

    } catch (error) {
      return error
    }

  }
}
