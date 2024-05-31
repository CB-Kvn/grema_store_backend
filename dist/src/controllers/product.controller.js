"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const client_1 = require("@prisma/client");
const luxon_1 = require("luxon");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient({});
class ProductController {
    async createProduct(_body) {
        try {
            const productInv = _body;
            const date = luxon_1.DateTime.now().setZone('America/Mexico_City').toString();
            const response = _body.map(async (element) => {
                let product = await prisma.inventory.create({
                    data: {
                        id: (0, uuid_1.v4)(),
                        quantity: element.inventory.quantity,
                        image: element.inventory.image,
                        price: element.inventory.price,
                        status: true,
                        desc: element.inventory.desc,
                        typeDesc: element.inventory.typeDesc,
                        createAtProductInventory: date,
                        updateAtProductInventory: date,
                        product: {
                            create: {
                                id: (0, uuid_1.v4)(),
                                name: element.name,
                                description: element.description,
                                material: element.material,
                                size: element.size,
                                shape: element.shape,
                                categoryId: element.categoryId,
                                color: element.color,
                                createAtProduct: date,
                                updateAtProduct: date,
                            }
                        }
                    }
                });
                return product;
            });
            return {
                success: "Ok",
                status: 201,
                msg: "New product create in db",
                data: { _body },
            };
        }
        catch (error) {
            if (error.code === "P2002")
                return {
                    status: 409,
                    msg: "Error create new product",
                    info: "New product already exist",
                    error: { ...error },
                };
            return {
                status: 400,
                msg: "Error create new product",
                error: { ...error },
            };
        }
    }
    async updateProduct(_body) {
        try {
            const user = await prisma.inventory.update({
                where: {
                    id: _body.id,
                },
                data: {
                    price: _body.price,
                    desc: _body.desc,
                    typeDesc: _body.typeDesc,
                    product: {
                        update: {
                            name: _body.name,
                            description: _body.description,
                            material: _body.material,
                            size: _body.size,
                            color: _body.color,
                            shape: _body.shape,
                        }
                    }
                },
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Update product",
                data: _body,
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error update product",
                error: { ...error },
            };
        }
    }
    async getAllProduct(_body) {
        try {
            const total = await prisma.inventory.count({
                where: {
                    AND: [
                        {
                            status: true
                        }
                    ]
                },
            });
            const product = await prisma.inventory.findMany({
                where: {
                    AND: [
                        {
                            status: true
                        }
                    ]
                },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            material: true,
                            size: true,
                            shape: true,
                            color: true,
                            categoryId: true,
                            category: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                },
                skip: _body.skip,
                take: _body.take
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Get all product",
                data: { product, total },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error Get all product",
                error: { ...error },
            };
        }
    }
    async getAllFilters(_body) {
        try {
            const response_color = await prisma.product.findMany({
                distinct: ['color'],
                select: {
                    color: true,
                },
            });
            const response_shape = await prisma.product.findMany({
                distinct: ['shape'],
                select: {
                    shape: true,
                },
            });
            const response_material = await prisma.product.findMany({
                distinct: ['material'],
                select: {
                    material: true,
                },
            });
            const response_size = await prisma.product.findMany({
                distinct: ['size'],
                select: {
                    size: true,
                },
            });
            const response_category = await prisma.category.findMany({
                distinct: ['name'],
                where: {
                    status: true
                },
                select: {
                    name: true
                }
            });
            const color = response_color.map((c) => c.color);
            const size = response_size.map((c) => c.size);
            const shape = response_shape.map((c) => c.shape);
            const material = response_material.map((c) => c.material);
            const categoria = response_category.map((c) => c.name);
            const body = {
                skip: _body.skip,
                take: _body.take,
                color: _body.color.length > 0 ? _body.color : color,
                tam: _body.tam.length > 0 ? _body.tam : size,
                forma: _body.forma.length > 0 ? _body.forma : shape,
                material: _body.material.length > 0 ? _body.material : material,
                categoria: _body.categoria.length > 0 ? _body.categoria : categoria
            };
            const product = await prisma.inventory.findMany({
                where: {
                    AND: [
                        {
                            product: {
                                category: {
                                    status: true
                                },
                            }
                        },
                        {
                            status: true
                        },
                        {
                            product: {
                                color: {
                                    in: body.color
                                }
                            }
                        },
                        {
                            product: {
                                material: {
                                    in: body.material
                                }
                            }
                        },
                        {
                            product: {
                                size: {
                                    in: body.tam
                                }
                            }
                        },
                        {
                            product: {
                                shape: {
                                    in: body.forma
                                }
                            }
                        },
                        {
                            product: {
                                category: {
                                    name: {
                                        in: body.categoria
                                    }
                                },
                            }
                        },
                    ]
                },
                include: {
                    product: {
                        select: {
                            category: {
                                select: {
                                    name: true
                                }
                            },
                            name: true,
                            description: true,
                            material: true,
                            size: true,
                            color: true,
                            shape: true,
                        }
                    }
                },
                skip: body.skip,
                take: body.take
            });
            const total = await prisma.inventory.count({
                where: {
                    AND: [
                        {
                            product: {
                                category: {
                                    status: true
                                },
                            }
                        },
                        {
                            status: true
                        },
                        {
                            product: {
                                color: {
                                    in: body.color
                                }
                            }
                        },
                        {
                            product: {
                                material: {
                                    in: body.material
                                }
                            }
                        },
                        {
                            product: {
                                size: {
                                    in: body.tam
                                }
                            }
                        },
                        {
                            product: {
                                shape: {
                                    in: body.forma
                                }
                            }
                        },
                        {
                            product: {
                                category: {
                                    name: {
                                        in: body.categoria
                                    }
                                }
                            }
                        },
                    ]
                }
            });
            return {
                success: "Ok",
                status: 200,
                msg: "Get all product",
                data: { product, total },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error Get all product",
                error: { ...error },
            };
        }
    }
    async getUniqueProduct(id) {
        try {
            const product = await prisma.inventory.findUnique({
                where: { id },
                include: {
                    product: true,
                },
            });
            if (!product) {
                return {
                    success: "Ok",
                    status: 404,
                    error: 'Inventory not found',
                    msg: 'Inventory not found',
                };
            }
            return {
                success: "Ok",
                status: 200,
                msg: "Get all product",
                data: { product },
            };
        }
        catch (error) {
            return {
                status: 400,
                msg: "Error Get all product",
                error: { ...error },
            };
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map