import { PrismaClient } from "@prisma/client";
import { ProfilePassword, Users } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/tokens/generate_token";
import { verifyToken } from "../utils/tokens/verify_token";
import { body } from "express-validator";
import { uploadImage } from "../utils/cloudinary";
import fs from 'fs-extra'

const prisma = new PrismaClient({});
export class UserController {
  async getUser() {
    try {
      console.log(
        "Sirve para llamar a la base de datos o los diferents metodos para el tratamiento de informacion"
      );
    } catch (error) { }
  }
  async createNewUser(req:any) {
    try {
      const hashedPassword = await bcrypt.hash(req.body!.password, 10);
      
      if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
        

      const user = await prisma.users.create({
        data: {
          id: parseInt(req.body.id),
          name: req.body.name,
          lastName: req.body.lastName,
          age: parseInt(req.body.age),
          dateOfBirth: new Date(),
          createAtUsers: new Date(),
          updateAtUsers: new Date(),
          genre: req.body.genre,
          profile: {
            create: {
              email: req.body.email,
              password: hashedPassword,
              address: req.body.address,
              img_public_id: result.public_id,
              img_secure_url: result.secure_url,
              createAtProfile: new Date(),
              updateAtProfile: new Date(),
            },
          },
        },
      });
        
      await fs.unlink(req.files.image.tempFilePath)
      }else{
        const user = await prisma.users.create({
          data: {
            id: parseInt(req.body.id),
            name: req.body.name,
            lastName: req.body.lastName,
            age: parseInt(req.body.age),
            dateOfBirth: new Date(),
            createAtUsers: new Date(),
            updateAtUsers: new Date(),
            genre: req.body.genre,
            profile: {
              create: {
                email: req.body.email,
                password: hashedPassword,
                address: req.body.address,
                img_public_id: 'NOT',
                img_secure_url: 'NOT',
                createAtProfile: new Date(),
                updateAtProfile: new Date(),
              },
            },
          },
        });
      }
      return {
        success: "Ok",
        status: 201,
        msg: "New user create in db",
        data: { _body:req.body },
      };
    } catch (error: any) {

      if (req.files?.image) {
        await fs.unlink(req.files.image.tempFilePath)
      }
      
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

  async loginUser(_body: any) {
    try {
      const result = await prisma.profile.findFirst({
        where: {
          email: _body.email
        },
      })

      if (result) {

        const passwordSuccess = await bcrypt.compare(_body.password, result.password)

        if(!passwordSuccess){
          return {
            status: 204,
            msg: "User not exist",
          };
        }
        
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
      }

      return {
        status: 204,
        msg: "User not exist",
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
