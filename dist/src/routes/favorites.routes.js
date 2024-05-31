"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const favorities_endpoint_1 = require("../services/favorities.endpoint");
exports.router = express_1.default.Router();
const endpoint = new favorities_endpoint_1.Favorities();
exports.router.all('/add-favorities', endpoint.addFavorities);
exports.router.all('/remove-favorities', endpoint.removeFavorities);
//# sourceMappingURL=favorites.routes.js.map