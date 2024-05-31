"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCar = void 0;
const client_1 = require("@prisma/client");
const shoppingCar_controller_1 = require("../controllers/shoppingCar.controller");
const controller = new shoppingCar_controller_1.ShoppingController();
const prisma = new client_1.PrismaClient({});
class ShoppingCar {
    async addShopping(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.addShoppingController(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async removeShopping(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.removeShoppingController(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.ShoppingCar = ShoppingCar;
//# sourceMappingURL=shoppingCar.endpoint.js.map