"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const shoppingCar_endpoint_1 = require("../services/shoppingCar.endpoint");
exports.router = express_1.default.Router();
const endpoint = new shoppingCar_endpoint_1.ShoppingCar();
exports.router.all('/add-shopping', endpoint.addShopping);
exports.router.all('/remove-shopping', endpoint.removeShopping);
//# sourceMappingURL=shoppinCar.routes.js.map