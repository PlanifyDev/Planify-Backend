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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.UserCacheDao = void 0;
const redis_1 = require("redis");
const helpers_1 = require("../helpers");
const loggerService_1 = __importDefault(require("../services/loggerService"));
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
        loggerService_1.default.info("Redis connected successfully ✅ ✅ ✅ ");
        client.disconnect();
    }
    catch (error) {
        loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ❌ ❌ ❌ ❌", error.message);
    }
}))();
class UserCacheDao {
    // ------------- save user to cache (sign in) ----------------
    cacheUser(user_id, cacheUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .sendCommand([
                    "hmset",
                    user_id,
                    "user_token",
                    cacheUser.user_token,
                    "firstname",
                    cacheUser.firstname,
                    "lastname",
                    cacheUser.lastname,
                    "email",
                    cacheUser.email,
                    "image_url",
                    cacheUser.image_url,
                    "user_plan",
                    cacheUser.user_plan,
                    "verified",
                    cacheUser.verified.toString(),
                    "role",
                    cacheUser.role,
                    "country",
                    cacheUser.country,
                ])
                    .then((value) => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- add verification code to cache  ----------------
    addVerificationCode(user_id, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .hSet(user_id, "verification_code", code)
                    .then(() => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- get user from cache  ----------------
    getCachedUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                const user = yield client
                    .hGetAll(user_id)
                    .then((value) => {
                    return Promise.resolve(value);
                })
                    .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                });
                client.disconnect();
                return user;
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- get verification code from cache  ----------------
    getVerificationCode(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                const code = yield client
                    .hGet(user_id, "verification_code")
                    .then((value) => {
                    return Promise.resolve(value);
                })
                    .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                });
                client.disconnect();
                return code;
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- update verification status ----------------
    updateVerificationCache(user_id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .sendCommand([
                    "hmset",
                    user_id,
                    "verified",
                    "true",
                    "user_token",
                    token,
                ])
                    .then((value) => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- update user data in cache ----------------
    updateUserDataCache(user_id, userCache) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .sendCommand([
                    "hmset",
                    user_id,
                    "firstname",
                    userCache.firstname,
                    "lastname",
                    userCache.lastname,
                    "image_url",
                    userCache.image_url,
                    "role",
                    userCache.role,
                    "country",
                    userCache.country,
                ])
                    .then((value) => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- update user image in cache ----------------
    updateImageCache(user_id, image_url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .sendCommand(["hmset", user_id, "image_url", image_url])
                    .then(() => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- update user plan in cache ----------------
    updatePlanCache(user_id, user_plan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .sendCommand(["hmset", user_id, "user_plan", user_plan])
                    .then(() => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- update user name in cache ----------------
    updateNameCache(user_id, firstname, lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .sendCommand([
                    "hmset",
                    user_id,
                    "firstname",
                    firstname,
                    "lastname",
                    lastname,
                ])
                    .then(() => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- delete verification code from cache  ----------------
    deleteVerificationCode(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .hDel(user_id, "verification_code")
                    .then(() => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
    // ------------- delete user from cache (sign out) ----------------
    signOutCache(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .del(user_id)
                    .then(() => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                loggerService_1.default.error("Error connecting to Redis ❌ ❌ ❌ ");
            }
        });
    }
}
exports.UserCacheDao = UserCacheDao;
exports.cache = new UserCacheDao();
//# sourceMappingURL=index.js.map