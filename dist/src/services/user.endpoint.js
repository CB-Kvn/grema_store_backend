"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersEndpoint = void 0;
const client_1 = require("@prisma/client");
const user_controller_1 = require("../controllers/user.controller");
const verified_fields_1 = require("../utils/validations/verified_fields");
const upload_handler_1 = require("../utils/upload/upload_handler");
const uuid_1 = require("uuid");
const controller = new user_controller_1.UserController();
const prisma = new client_1.PrismaClient({});
class UsersEndpoint {
    async getUser(req, res) {
        try {
            return res.status(200).json({ msg: "Estamos bien" });
        }
        catch (error) {
            return res.sendStatus(400);
        }
    }
    async createNewUser(req, res) {
        try {
            const body = JSON.parse(JSON.stringify(req.body));
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            let urlList = [];
            if (req.files && req.files.length !== 0) {
                urlList = await (0, upload_handler_1.cloudinaryUpload)(req.files);
                console.log(urlList);
            }
            else {
                urlList.push("https://res.cloudinary.com/denqtcsyy/image/upload/f_auto,q_auto/v1/users-profile/a0tysxy6wukagduank4k");
                console.log('No hay imagenes');
            }
            //Evalua que los parametros enviado en la consulta se encunetren bien
            const validate = (0, verified_fields_1.Verified_Fields)(body, "createNewUser");
            if (!validate.validate) {
                return res.status(validate.status).json({
                    status: validate.status,
                    msg: validate.msg,
                    error: validate.error,
                });
            }
            const response = await controller.createNewUser(body, urlList);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async deleteUser(req, res) {
        try {
            const body = req.body;
            if (req.method !== "PUT")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.deleteUser(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async updateProfilePassword(req, res) {
        try {
            const body = req.body;
            if (req.method !== "PUT")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const validate = (0, verified_fields_1.Verified_Fields)(body, "updateProfilePassword");
            if (!validate.validate) {
                return res.status(validate.status).json({
                    status: validate.status,
                    msg: validate.msg,
                    error: validate.error,
                });
            }
            const response = await controller.updateProfilePassword(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async updateProfile(req, res) {
        try {
            const body = req.body;
            if (req.method !== "PUT")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.updateUser(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(400);
        }
    }
    async verifyPassword(req, res) {
        try {
            const body = req.body;
            if (req.method !== "PUT")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.verifyPassword(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async loginUser(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const guest = req.headers.guest;
            if (!guest) {
                const validate = (0, verified_fields_1.Verified_Fields)(body, "loginUser");
                if (!validate.validate) {
                    return res.status(validate.status).json({
                        status: validate.status,
                        msg: validate.msg,
                        error: validate.error,
                    });
                }
                const response = await controller.loginUser(body);
                if (response.error)
                    return res.status(response.status).json(response);
                return res.status(200).json(response);
            }
            else {
                const body = (0, uuid_1.v4)();
                const response = await controller.loginGuest(body);
                if (response.error)
                    return res.status(response.status).json(response);
                return res.status(200).json(response);
            }
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async loginGuest(req, res) {
        try {
            const body = req.headers.userguest;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async refreshGuestToken(req, res) {
        try {
            const body = req;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.refreshToken(body);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.UsersEndpoint = UsersEndpoint;
//# sourceMappingURL=user.endpoint.js.map