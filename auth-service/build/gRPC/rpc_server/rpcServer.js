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
const grpc_1 = __importDefault(require("grpc"));
const help = __importStar(require("../../helpers/accessEnv"));
const datastore_1 = require("../../datastore");
const PORT = help.accessEnv("AUTH_GRPC_PORT");
const auth_grpc_pb_1 = require("../generated/auth_grpc_pb");
const auth_pb_1 = require("../generated/auth_pb");
class Imp_update_plan_serviceServer {
    constructor() {
        console.log(`>>> grpc server is running on port ${PORT} ....`);
    }
    update_plan(call, callback) {
        console.log(">>> update_plan request received", "- message:", call.request.toObject());
        const user_id = call.request.getUserId();
        const user_plan = call.request.getUserPlan();
        const res = new auth_pb_1.update_plan_res();
        if (!user_id || !user_plan) {
            console.log(">>> update_plan request failed", "- error:", "user_id or user_plan is missing");
            res.setStatus(false);
            return callback(new Error("user_id or user_plan is missing"), res);
        }
        datastore_1.DB.updatePlan(user_id, user_plan)
            .then(() => {
            console.log(">>> update_plan request success");
            res.setStatus(true);
            return callback(null, res);
        })
            .catch((error) => {
            console.log(">>> update_plan request failed", "- error:", error);
            res.setStatus(false);
            return callback(error, res);
        });
    }
}
const server = new grpc_1.default.Server();
server.addService(auth_grpc_pb_1.update_plan_serviceService, new Imp_update_plan_serviceServer());
server.bind(`localhost:${PORT}`, grpc_1.default.ServerCredentials.createInsecure());
server.start();
//# sourceMappingURL=rpcServer.js.map