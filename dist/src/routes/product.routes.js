"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const product_endpoint_1 = require("../services/product.endpoint");
exports.router = express_1.default.Router();
const endpoint = new product_endpoint_1.Product();
exports.router.all('/create-product', endpoint.createProduct);
exports.router.all('/modify-product', endpoint.updateProduct);
exports.router.all('/get-all', endpoint.getAllProduct);
exports.router.all('/get-all-filters', endpoint.getAllFilters);
exports.router.all('/inventory/:id', endpoint.getUniqueProduct);
//# sourceMappingURL=product.routes.js.map