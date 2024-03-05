import { PrismaClient } from "@prisma/client";
import { LoginProcess, ProfilePassword, Users } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/tokens/generate_token";
import { verifyToken } from "../utils/tokens/verify_token";
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
  async createNewUser(_body: Users) {
    try {
      const hashedPassword = await bcrypt.hash(_body.profile.password, 10);
      const user = await prisma.users.create({
        data: {
          id: _body.id,
          name: _body.name,
          lastName: _body.lastName,
          age: _body.age,
          createAtUsers: new Date(),
          updateAtUsers: new Date(),
          genre: _body.genre,
          profile: {
            create: {
              email: _body.profile.email,
              password: hashedPassword,
              address: _body.profile.address,
              image: _body.profile.image,
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
  async deleteUser() {
    try {
      console.log(
        "Sirve para llamar a la base de datos o los diferents metodos para el tratamiento de informacion"
      );
    } catch (error) { }
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
      })

      if (!result) {
        return {
          status: 204,
          msg: "User not exist",
        };
      }

      const verifiedPassword = await bcrypt.compare (_body.password,result.password)

      if(!verifiedPassword) return

      return {
        success: "Ok",
        status: 200,
        msg: "Found User",
        data: {
          ..._body, token: generateToken({
            userId: result.id,
            email: result.email,
            password: result.password
          })
        },
      };
    } catch (error:any) {
      return {
        status: 400,
        msg: "Error search user",
        error: { ...error },
      };
    }
  }
}
