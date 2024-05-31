"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritiesController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({});
class FavoritiesController {
    async addFavorities(_body) {
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
                msg: "New favorite create in db",
                data: { _body },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error create favorite",
                error: { ...error },
            };
        }
    }
    async removeFavorities(_body) {
        try {
            const favorities = await prisma.favorites_Carts.update({
                where: {
                    id: _body.id
                },
                data: {
                    status: false
                }
            });
            return {
                success: "Ok",
                status: 201,
                msg: "Remove favorite in db",
                data: { favorities },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error create favorite",
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
exports.FavoritiesController = FavoritiesController;
//# sourceMappingURL=favorities.controller.js.map