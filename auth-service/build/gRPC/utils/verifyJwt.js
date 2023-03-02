"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const helpers_1 = require("../../helpers");
const datastore_1 = require("../../datastore");
const verifyJwt = (jwt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!jwt) {
        return Promise.reject("Invalid Token");
    }
    let payload;
    try {
        payload = (0, helpers_1.verifyToken)(jwt);
    }
    catch (error) {
        return Promise.reject(helpers_1.ERRORS[error.message]);
    }
    const user = yield datastore_1.DB.getUserById(payload.userId);
    if (!user) {
        return Promise.reject(helpers_1.ERRORS.USER_NOT_FOUND);
    }
    if (!user.verified) {
        return Promise.reject(helpers_1.ERRORS.NOT_VERIFIED);
    }
    return Promise.resolve({
        user_id: user.id,
    });
});
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=verifyJwt.js.map