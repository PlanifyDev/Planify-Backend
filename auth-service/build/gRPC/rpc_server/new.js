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
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const datastore_1 = require("../../datastore");
//path to our proto file
const PROTO_FILE = "../proto/auth.proto";
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
const authProto = grpc.loadPackageDefinition(pkgDefs);
//create gRPC server
const server = new grpc.Server();
//implement auth service
server.addService(authProto.update_plan_service.service, {
    //implment update_plan
    update_plan: (input, callback) => {
        const user_id = input.Request.user_id;
        const user_plan = input.request.user_plan;
        console.log(">>> update_plan request received", "- message:", {
            user_id,
            user_plan,
        });
        if (!user_id || !user_plan) {
            console.log(">>> update_plan request failed", "- error:", "user_id or user_plan is missing");
            return callback(new Error("user_id or user_plan is missing"), null);
        }
        datastore_1.DB.updatePlan(user_id, user_plan)
            .then(() => {
            console.log(">>> update_plan request success");
            return callback(null, { status: true });
        })
            .catch((error) => {
            console.log(">>> update_plan request failed", "- error:", error);
            return callback(error, { status: false });
        });
    },
});
//start the Server
server.bindAsync(
//port to serve on
"0.0.0.0:5000", 
//authentication settings
grpc.ServerCredentials.createInsecure(), 
//server start callback
(error, port) => {
    console.log(`>>> grpc server listening on port ${port}`);
    server.start();
});
//# sourceMappingURL=new.js.map