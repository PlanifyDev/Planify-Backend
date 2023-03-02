"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.cleardb = exports.deleteUserHandler = void 0;
const datastore_1 = require("../datastore");
const help = __importStar(require("../helpers"));
const cache_1 = require("../cache");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// ----------------- delete user handler ------------------------------
const deleteUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    // -------------- delete user from cache ----------------
    yield cache_1.cache.signOutCache(userId).catch((err) => {
        return next(err);
    });
    // -------------- delete user from DB ----------------
    yield datastore_1.DB.deleteUser(userId).catch((err) => {
        return next(err);
    });
    // -------------- delete user from S3 ----------------
    aws_sdk_1.default.config.update({
        accessKeyId: help.accessEnv("AWS_ACCESS_KEY"),
        secretAccessKey: help.accessEnv("AWS_SECRET_KEY"),
        region: "us-east-1",
    });
    const s3 = new aws_sdk_1.default.S3();
    const params = {
        Bucket: help.accessEnv("AWS_S3_BUCKET_NAME"),
        Key: userId,
    };
    s3.deleteObject(params, (err, data) => {
        if (err) {
            return next(err);
        }
    });
    return res.sendStatus(200);
});
exports.deleteUserHandler = deleteUserHandler;
// ----------------- delete all users from db ------------------------------
const cleardb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield datastore_1.DB.clearUsers()
        .then(() => {
        return res.sendStatus(200);
    })
        .catch((err) => {
        return next(err);
    });
});
exports.cleardb = cleardb;
//# sourceMappingURL=deleteUserHandler.js.map