"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verified_Fields = void 0;
const grema_interfaces_1 = require("../../interfaces/grema.interfaces");
const verify_algorith_fields_1 = require("./verify_algorith_fields");
const Verified_Fields = (body, type) => {
    let data = {};
    let valiField = false;
    let valiFieldContent = false;
    let noFieldExist = [];
    let errorField = [];
    switch (type) {
        case "createNewUser": {
            return (0, verify_algorith_fields_1.Verified_Fields_Algorith)(body, grema_interfaces_1.KeysToValidateUserCreate);
        }
        case "updateProfilePassword": {
            return (0, verify_algorith_fields_1.Verified_Fields_Algorith)(body, grema_interfaces_1.KeysToValidateProfilePassword);
        }
        case "loginUser": {
            return (0, verify_algorith_fields_1.Verified_Fields_Algorith)(body, grema_interfaces_1.KeysToValidateProfileLogin);
        }
    }
};
exports.Verified_Fields = Verified_Fields;
//# sourceMappingURL=verified_fields.js.map