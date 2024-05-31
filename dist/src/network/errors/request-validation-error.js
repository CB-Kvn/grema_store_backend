"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResquestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class ResquestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, ResquestValidationError.prototype);
    }
    serializeErrors() {
        const errors = this.errors.map((err) => {
            return { message: err.msg, field: err.type };
        });
        return {
            success: false,
            errors,
            data: ''
        };
    }
}
exports.ResquestValidationError = ResquestValidationError;
//# sourceMappingURL=request-validation-error.js.map