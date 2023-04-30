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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handler = __importStar(require("../handlers"));
const middleware_1 = require("../middleware");
const middleware_2 = require("../middleware");
const endPoints_1 = require("../contracts/endPoints");
exports.versionRouter = (0, express_1.Router)();
Object.keys(endPoints_1.VersionsEndpoints).forEach((key) => {
    const { method, url, handler: handlerName, auth } = endPoints_1.VersionsEndpoints[key];
    const handlerFunc = handler[handlerName];
    if (auth) {
        exports.versionRouter[method](url, middleware_1.authByCache, (0, express_async_handler_1.default)(handlerFunc), middleware_2.loggerMiddleware);
    }
    else {
        exports.versionRouter[method](url, (0, express_async_handler_1.default)(handlerFunc), middleware_2.loggerMiddleware);
    }
});
//# sourceMappingURL=versionRouter.js.map