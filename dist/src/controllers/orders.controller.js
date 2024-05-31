"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersControllers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({});
class OrdersControllers {
    async Orders(body) {
        try {
            const color = await prisma.product.findMany({
                distinct: ['color'],
                select: {
                    color: true,
                },
            });
            const shape = await prisma.product.findMany({
                distinct: ['shape'],
                select: {
                    shape: true,
                },
            });
            const material = await prisma.product.findMany({
                distinct: ['material'],
                select: {
                    material: true,
                },
            });
            const size = await prisma.product.findMany({
                distinct: ['size'],
                select: {
                    size: true,
                },
            });
            const category = await prisma.category.findMany({
                distinct: ['name'],
                where: {
                    status: true
                },
                select: {
                    name: true
                }
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Get all filters",
                data: { color, shape, size, material, category },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error Get all filters",
                error: { ...error },
            };
        }
    }
}
exports.OrdersControllers = OrdersControllers;
//# sourceMappingURL=orders.controller.js.map