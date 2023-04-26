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
exports.userRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handler = __importStar(require("../handlers/userHandler"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const middleware = __importStar(require("../middleware"));
const authByCache_1 = require("../middleware/authByCache");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", (0, express_async_handler_1.default)(handler.signUpHandler));
exports.userRouter.put("/verify/:id", middleware.authByCache, (0, express_async_handler_1.default)(handler.verifyHandler));
exports.userRouter.post("/signin", (0, express_async_handler_1.default)(handler.signInHandler));
exports.userRouter.get("/signout/:id", (0, express_async_handler_1.default)(handler.signOutHandler));
exports.userRouter.put("/update-img/:id", middleware.authByCache, middleware.checkVerification, (0, express_fileupload_1.default)(), (0, express_async_handler_1.default)(handler.updateImageHandler));
exports.userRouter.put("/update-all/:id", middleware.authByCache, middleware.checkVerification, (0, express_async_handler_1.default)(handler.updateAllHandler));
// forgot password endpoint
exports.userRouter.post("/forget-password", (0, express_async_handler_1.default)(handler.forgetPassHandler));
// reset password endpoint
exports.userRouter.post("/reset-password", (0, express_async_handler_1.default)(handler.resetPassHandler));
exports.userRouter.delete("/delete-user/:id", middleware.authByCache, (0, express_async_handler_1.default)(handler.deleteUserHandler));
exports.userRouter.get("/resend-verification/:id", authByCache_1.authByCache, (0, express_async_handler_1.default)(handler.resendVerificationHandler));
// endpoint to get data of user
exports.userRouter.get("/get-user/:id", authByCache_1.authByCache, (0, express_async_handler_1.default)(handler.getUserHandler));
// endpoint to clear database
exports.userRouter.delete("/cleardb", (0, express_async_handler_1.default)(handler.cleardb));
exports.default = exports.userRouter;
//# sourceMappingURL=userRouter.js.map