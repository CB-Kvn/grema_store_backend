"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_token_1 = require("../utils/tokens/generate_token");
const luxon_1 = require("luxon");
const prisma = new client_1.PrismaClient({});
class UserController {
    async getUser() {
        try {
            console.log("Sirve para llamar a la base de datos o los diferents metodos para el tratamiento de informacion");
        }
        catch (error) { }
    }
    async createNewUser(_body, urlList) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(_body.profile.password, 10);
            const user = await prisma.users.create({
                data: {
                    id: _body.id,
                    name: _body.name,
                    lastName: _body.lastName,
                    cellphone: _body.cellphone,
                    createAtUsers: luxon_1.DateTime.now().setZone('America/Mexico_City').toString(),
                    updateAtUsers: luxon_1.DateTime.now().setZone('America/Mexico_City').toString(),
                    genre: _body.genre,
                    status: true,
                    profile: {
                        create: {
                            email: _body.profile.email,
                            password: hashedPassword,
                            address: _body.profile.address,
                            image: urlList[0],
                            createAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString(),
                            updateAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString()
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
        }
        catch (error) {
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
    async updateUser(_body) {
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
                            createAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString(),
                            updateAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString()
                        },
                    },
                },
                select: {
                    cellphone: true,
                    profile: {
                        select: {
                            address: true
                        }
                    }
                }
            });
            return {
                success: "Ok",
                status: 201,
                msg: "Update profile",
                data: { user },
            };
        }
        catch (error) {
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
    async deleteUser(_body) {
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
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error delete profile",
                error: { ...error },
            };
        }
    }
    async updateProfilePassword(_body) {
        try {
            const user = await prisma.profile.update({
                where: {
                    userId: _body.id,
                },
                data: {
                    password: _body.password,
                    updateAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString()
                },
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Update password in profile",
                data: _body,
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error update profile",
                error: { ...error },
            };
        }
    }
    async loginUser(_body) {
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
                            lastName: true,
                            cellphone: true,
                        }
                    }
                },
            });
            if (!result) {
                return {
                    status: 204,
                    msg: "User not found",
                };
            }
            const verifiedPassword = await bcrypt_1.default.compare(_body.password, result.password);
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
                    name: result.user.name + " " + result.user.lastName,
                    userId: result.user.id,
                    image: result.image,
                    token: (0, generate_token_1.generateToken)({
                        userId: result.id,
                        email: result.email
                    }),
                    type: "inscript",
                    profileId: result.id
                },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error search user",
                error: { ...error },
            };
        }
    }
    async verifyPassword(_body) {
        try {
            const result = await prisma.profile.findFirst({
                where: {
                    email: _body.email,
                },
                select: {
                    password: true,
                    address: true,
                },
            });
            if (!result) {
                return {
                    status: 204,
                    msg: "User not found",
                };
            }
            const verifiedPassword = await bcrypt_1.default.compare(_body.password, result.password);
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
                    updateAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString()
                }
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Update passord",
                data: {
                    body: _body,
                    result: finalResult
                },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error update password",
                error: { ...error },
            };
        }
    }
    async loginGuest(_body) {
        try {
            const result = (0, generate_token_1.generateToken)({ userId: _body, email: "" });
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
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error search user",
                error: { ...error },
            };
        }
    }
    async refreshToken(req) {
        try {
            const { headers } = req;
            const id = headers.user;
            const email = headers.email;
            const image = headers.image;
            let result;
            return {
                success: "Ok",
                status: 200,
                msg: "Token generate",
                data: {
                    email: email,
                    userId: id,
                    image: image,
                    token: (0, generate_token_1.generateToken)({
                        userId: id,
                        email: email
                    }),
                    type: "inscript"
                },
            };
        }
        catch (error) {
            return error;
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map