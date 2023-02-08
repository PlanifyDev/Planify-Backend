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
exports.cache = exports.UserCacheDao = void 0;
const redis_1 = require("redis");
const helpers_1 = require("../helpers");
const env = (0, helpers_1.accessEnv)("ENV");
let client;
if (env === "prod") {
    client = (0, redis_1.createClient)((0, helpers_1.accessEnv)("REDIS_URL"));
}
else {
    client = (0, redis_1.createClient)();
}
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
                    "username",
                    cacheUser.username,
                    "plan_token",
                    cacheUser.plan_token,
                    "verified",
                    cacheUser.verified,
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
                console.error("Error connecting to Redis:", error);
                process.exit(1);
            }
        });
    }
    // ------------- update verification status ----------------
    updateVerificationCache(user_id, verified) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .hSet(user_id, "verified", verified)
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
                console.error("Error connecting to Redis:", error);
                process.exit(1);
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
                console.error("Error connecting to Redis:", error);
                process.exit(1);
            }
        });
    }
    // ------------- update user name in cache ----------------
    updateNameCache(user_id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                yield client
                    .hSet(user_id, "username", username)
                    .then(() => {
                    return Promise.resolve();
                })
                    .catch((err) => {
                    return Promise.reject(err);
                });
                client.disconnect();
            }
            catch (error) {
                console.error("Error connecting to Redis:", error);
                process.exit(1);
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
                console.error("Error connecting to Redis:", error);
                process.exit(1);
            }
        });
    }
}
exports.UserCacheDao = UserCacheDao;
exports.cache = new UserCacheDao();
//# sourceMappingURL=index.js.map