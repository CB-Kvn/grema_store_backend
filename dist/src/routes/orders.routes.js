"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const orders_endpoints_1 = require("../services/orders.endpoints");
exports.router = express_1.default.Router();
const endpoint = new orders_endpoints_1.Orders();
exports.router.all('/orders', endpoint.Orders);
//# sourceMappingURL=orders.routes.js.map