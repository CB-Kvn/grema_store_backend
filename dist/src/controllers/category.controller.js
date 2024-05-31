"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const client_1 = require("@prisma/client");
const luxon_1 = require("luxon");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient({});
class CategoriesController {
    async createCategories(_body) {
        try {
            const response = _body.map(async (element) => {
                const category = await prisma.category.create({
                    data: {
                        id: (0, uuid_1.v4)(),
                        name: element.name,
                        status: true,
                        createAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString(),
                        updateAtProfile: luxon_1.DateTime.now().setZone('America/Mexico_City').toString(),
                    }
                });
            });
            return {
                success: "Ok",
                status: 201,
                msg: "New category create in db",
                data: { _body },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error create category",
                error: { ...error },
            };
        }
    }
    async updateStatusCategory(_body) {
        try {
            const user = await prisma.category.update({
                where: {
                    id: _body.id,
                },
                data: {
                    status: _body.status,
                },
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Update status category",
                data: _body,
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error status category",
                error: { ...error },
            };
        }
    }
    async getAllCategory(_body) {
        try {
            const categories = await prisma.category.findMany({});
            return {
                success: "Ok",
                status: 200,
                msg: "Get all category",
                data: categories,
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error Get all category",
                error: { ...error },
            };
        }
    }
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=category.controller.js.map