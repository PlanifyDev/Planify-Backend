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
exports.isSameUser = exports.checkVerification = exports.jwtParseMiddleware = void 0;
const helpers_1 = require("../helpers");
const datastore_1 = require("../datastore");
const jwtParseMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ error: helpers_1.ERRORS.BAD_TOKEN });
    }
    let payload;
    try {
        payload = (0, helpers_1.verifyToken)(token);
    }
    catch (error) {
        return res.status(401).send({ error: helpers_1.ERRORS[error.message] });
    }
    const user = yield datastore_1.DB.getUserById(payload.userId);
    if (!user) {
        return res.status(401).send({ error: helpers_1.ERRORS.USER_NOT_FOUND });
    }
    res.locals.userId = user.id;
    res.locals.verified = user.verified;
    return next();
});
exports.jwtParseMiddleware = jwtParseMiddleware;
const checkVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.verified != "true") {
        return res.status(401).send({ error: helpers_1.ERRORS.NOT_VERIFIED });
    }
    return next();
});
exports.checkVerification = checkVerification;
const isSameUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.userId) {
        return res.sendStatus(401);
    }
    if (res.locals.userId !== req.params.id) {
        return res.status(401).send({ error: helpers_1.ERRORS.NOT_AUTHORIZED });
    }
    return next();
});
exports.isSameUser = isSameUser;
//# sourceMappingURL=authMiddleware.js.map