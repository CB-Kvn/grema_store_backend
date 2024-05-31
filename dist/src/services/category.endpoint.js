"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const client_1 = require("@prisma/client");
const category_controller_1 = require("../controllers/category.controller");
const controller = new category_controller_1.CategoriesController();
const prisma = new client_1.PrismaClient({});
class Categories {
    async createCategories(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.createCategories(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async updateStatusCategory(req, res) {
        try {
            const body = req.body;
            if (req.method !== "PUT")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.updateStatusCategory(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async getAllCategory(req, res) {
        try {
            const body = req.body;
            if (req.method !== "GET")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.getAllCategory(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.Categories = Categories;
//# sourceMappingURL=category.endpoint.js.map