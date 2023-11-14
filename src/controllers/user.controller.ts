import { PrismaClient } from "@prisma/client";
import { ProfilePassword, Users } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/tokens/generate_token";
import { verifyToken } from "../utils/tokens/verify_token";
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
      const hashedPassword = await bcrypt.hash(_body.password, 10);
      const user = await prisma.users.create({
        data: {
          id: _body.id,
          name: _body.name,
          lastName: _body.lastName,
          age: _body.age,
          dateOfBirth: new Date(),
          createAtUsers: new Date(),
          updateAtUsers: new Date(),
          genre: _body.genre,
          profile: {
            create: {
              email: _body.email,
              password: hashedPassword,
              address: _body.address,
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
}
