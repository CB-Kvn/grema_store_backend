"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorities = void 0;
const client_1 = require("@prisma/client");
const favorities_controller_1 = require("../controllers/favorities.controller");
const controller = new favorities_controller_1.FavoritiesController();
const prisma = new client_1.PrismaClient({});
class Favorities {
    async addFavorities(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.addFavorities(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async removeFavorities(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.removeFavorities(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.Favorities = Favorities;
//# sourceMappingURL=favorities.endpoint.js.map