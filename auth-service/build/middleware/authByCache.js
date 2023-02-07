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
exports.authByCache = void 0;
const helpers_1 = require("../helpers");
const cache_1 = require("../cache");
const authByCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const user_id = req.params.id;
    if (!token) {
        return res.status(401).send({ error: helpers_1.ERRORS.BAD_TOKEN });
    }
    const user = yield cache_1.cache.getCachedUser(user_id);
    if (!Object.keys(user).length) {
        return res.status(401).send({ error: helpers_1.ERRORS.USER_NOT_FOUND });
    }
    if (user.user_token !== token) {
        return res.status(401).send({ error: helpers_1.ERRORS.BAD_TOKEN });
    }
    res.locals.userId = user_id;
    res.locals.verified = user.verified;
    return next();
});
exports.authByCache = authByCache;
//# sourceMappingURL=authByCache.js.map