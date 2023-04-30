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
const redis_1 = require("redis");
const helpers_1 = require("../helpers");
const env = (0, helpers_1.accessEnv)("ENV_CACHE").trim();
let client;
if (env === "prod") {
    client = (0, redis_1.createClient)({
        url: (0, helpers_1.accessEnv)("REDIS_URL"),
    });
}
else {
    client = (0, redis_1.createClient)({
        url: (0, helpers_1.accessEnv)("REDIS_URL_LOCAL"),
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        helpers_1.logger.info("Redis connected successfully ✅ ✅ ✅ ");
        client.disconnect();
    }
    catch (error) {
        helpers_1.logger.error("Error connecting to Redis ❌ ❌ ❌ ❌ ❌ ❌ ❌", error.message);
    }
}))();
const authByCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const user_id = req.body.user_id;
    if (!user_id) {
        res.status(401).send({ error: "User ID is missing" });
        return next("User ID is missing");
    }
    if (!token) {
        res.status(401).send({ error: "Bad token" });
        return next("Bad token");
    }
    const user = yield getCachedUser(user_id);
    if (!Object.keys(user).length) {
        res.status(401).send({ error: "User not found" });
        return next("User not found");
    }
    if (user.user_token !== token) {
        res.status(401).send({ error: "Bad token" });
        return next("Bad token");
    }
    res.locals.userId = user_id;
    res.locals.verified = user.verified;
    return next();
});
exports.authByCache = authByCache;
// ------------- get user from cache  ----------------
const getCachedUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const user = yield client
            .hGetAll(user_id)
            .then((value) => {
            return Promise.resolve(value);
        })
            .catch((err) => {
            helpers_1.logger.error("Redis Error: in by cache in get user func", err.message);
        });
        client.disconnect();
        return user;
    }
    catch (error) {
        helpers_1.logger.error("Error connecting to Redis:", error.message);
    }
});
//# sourceMappingURL=authByCache.js.map