"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
const filters_controller_1 = require("../controllers/filters.controller");
const controller = new filters_controller_1.FiltersControllers();
class Filters {
    async getAllFilters(req, res) {
        try {
            if (req.method !== "GET")
                return res.status(405).json({
                    status: 405,
                    msg: "Invalid Method",
                    error: "Method is a PUT but it send a " + req.method,
                });
            const response = await controller.getAllFilters();
            if (response.error)
                return res.status(response.status).json(response);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.sendStatus(500);
        }
    }
}
exports.Filters = Filters;
//# sourceMappingURL=filters.endpoint.js.map