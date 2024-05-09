import { PrismaClient } from "@prisma/client";
import { LoginProcess, ProfilePassword, Users } from "../interfaces/grema.interfaces";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/tokens/generate_token";
import { request, Request } from "express";
import { verifyTokenAndHeaders } from "../utils/tokens/verify_token";
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
          id: _body.id,
          name: _body.name,
          lastName: _body.lastName,
          cellphone: _body.cellphone,
          createAtUsers: new Date(),
          updateAtUsers: new Date(),
          genre: _body.genre,
          status: true,
          profile: {
            create: {
              email: _body.profile.email,
              password: hashedPassword,
              address: _body.profile.address,
              image: urlList[0],
              createAtProfile: new Date(),
              updateAtProfile: new Date(),
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
  async updateUser() {
    try {
      console.log(
        "Sirve para llamar a la base de datos o los diferents metodos para el tratamiento de informacion"
      );
    } catch (error) { }
  }
  async deleteUser(_body: any) {
    try {
      const user = await prisma.users.update({
        where: {
          id: _body.id,
        },
        data: {
          status: false,
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
  async updateProfilePassword(_body: ProfilePassword) {
    try {
      const user = await prisma.profile.update({
        where: {
          userId: _body.id,
        },
        data: {
          password: _body.password,
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
          email: _body.email,
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
              name:true,
              lastName:true,
              cellphone:true,

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
          name: result.user.name +" "+result.user.lastName,
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
