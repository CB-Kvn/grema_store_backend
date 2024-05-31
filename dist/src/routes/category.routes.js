"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const category_endpoint_1 = require("../services/category.endpoint");
exports.router = express_1.default.Router();
const endpoint = new category_endpoint_1.Categories();
exports.router.all('/create-category', endpoint.createCategories);
exports.router.all('/get-all', endpoint.getAllCategory);
exports.router.all('/modify-category', endpoint.updateStatusCategory);
//# sourceMappingURL=category.routes.js.map