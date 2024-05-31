"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const orders_controller_1 = require("../controllers/orders.controller");
const controller = new orders_controller_1.OrdersControllers();
class Orders {
    async Orders(req, res) {
        try {
            req.body;
            if (req.method !== "POST")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.Orders(req.body);
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.endpoints.js.map