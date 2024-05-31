"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenMiddleware = exports.isValidated = void 0;
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../../network/errors/request-validation-error");
const verify_token_1 = require("../../utils/tokens/verify_token");
const isValidated = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.ResquestValidationError(errors.array());
    }
    return next();
};
exports.isValidated = isValidated;
const validateTokenMiddleware = async (req, res, next) => {
    try {
        const { headers } = req;
        const authToken = headers.grema_store_token;
        if ((0, verify_token_1.verifyTokenAndHeaders)(authToken)) {
            return next();
        }
        return res.status(401).json({ message: "Expired session" });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};
exports.validateTokenMiddleware = validateTokenMiddleware;
//# sourceMappingURL=validators.js.map