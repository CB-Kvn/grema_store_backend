"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({});
class ShoppingController {
    async addShoppingController(_body) {
        try {
            const favorites = await prisma.favorites_Carts.create({
                data: {
                    id: _body.id,
                    userId: _body.userId,
                    quantity: _body.quantyOrder,
                    type: _body.type,
                    productId: _body.productId,
                    status: true
                },
            });
            return {
                success: "Ok",
                status: 201,
                msg: "New shopping create in db",
                data: { _body },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error create shopping",
                error: { ...error },
            };
        }
    }
    async removeShoppingController(_body) {
        try {
            const shopping = await prisma.favorites_Carts.update({
                where: {
                    id: _body.id,
                    status: true
                },
                data: {
                    status: false
                }
            });
            return {
                success: "Ok",
                status: 201,
                msg: "Remove shopping  in db",
                data: { shopping },
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
    async getFavorities(_body) {
        try {
            const favorities = await prisma.favorites_Carts.findMany({
                where: {
                    userId: _body.userId,
                    status: true
                },
                include: {
                    product: {
                        select: {
                            name: true,
                            product: {
                                select: {
                                    image: true,
                                    price: true,
                                    desc: true
                                }
                            }
                        }
                    }
                }
            });
            return {
                success: "Ok",
                status: 201,
                msg: "New category create in db",
                data: { favorities },
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
}
exports.ShoppingController = ShoppingController;
//# sourceMappingURL=shoppingCar.controller.js.map