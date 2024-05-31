"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validators_1 = require("../middlewares/validators/validators");
const user_endpoint_1 = require("../services/user.endpoint");
exports.router = express_1.default.Router();
const endpoint = new user_endpoint_1.UsersEndpoint();
exports.router.all('/get-user', validators_1.isValidated, endpoint.getUser);
exports.router.all('/create-user', validators_1.isValidated, endpoint.createNewUser);
exports.router.all('/delete-user', validators_1.isValidated, endpoint.deleteUser);
exports.router.all('/update-profile', endpoint.updateProfile);
exports.router.all('/reset-profile-password', endpoint.updateProfilePassword);
exports.router.all('/verify-password', endpoint.verifyPassword);
exports.router.post('/loggin-user', validators_1.isValidated, endpoint.loginUser);
exports.router.post('/loggin-user-guest', endpoint.loginGuest);
exports.router.post('/loggin-user-guest-refresh', endpoint.refreshGuestToken);
//# sourceMappingURL=user.routes.js.map