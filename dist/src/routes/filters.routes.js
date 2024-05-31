"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const filters_endpoint_1 = require("../services/filters.endpoint");
exports.router = express_1.default.Router();
const endpoint = new filters_endpoint_1.Filters();
exports.router.all('/filters', endpoint.getAllFilters);
//# sourceMappingURL=filters.routes.js.map