"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const client_1 = require("@prisma/client");
const product_controller_1 = require("../controllers/product.controller");
const controller = new product_controller_1.ProductController();
const prisma = new client_1.PrismaClient({});
class Product {
    async createProduct(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a POST but it send a " + req.method,
                });
            const response = await controller.createProduct(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async updateProduct(req, res) {
        try {
            const body = req.body;
            if (req.method !== "PUT")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.updateProduct(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    // async updateProductStatus(req: Request, res: Response) {
    //   try {
    //     const body = req.body;
    //     if (req.method !== "PUT")
    //       return res.status(405).json({
    //         status: 405,
    //         msg: "Invalid Method",
    //         error: "Method is a PUT but it send a " + req.method,
    //       });
    //     const response: any= await controller.updateProductStatus(
    //       body
    //     );
    //     if (response!.error) return res.status(response!.status!).json(response);
    //     return res.status(200).json(response);
    //   } catch (error) {
    //     return res.sendStatus(500);
    //   }
    // }
    async getAllProduct(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.getAllProduct(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async getAllFilters(req, res) {
        try {
            const body = req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.getAllFilters(body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
    async getUniqueProduct(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            if (req.method !== "GET")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.getUniqueProduct(id);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching inventory' });
        }
    }
}
exports.Product = Product;
//# sourceMappingURL=product.endpoint.js.map