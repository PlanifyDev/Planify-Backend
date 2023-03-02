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
const util = __importStar(require("../utils"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
const PORT = process.env.AUTH_GRPC_PORT;
const auth_grpc_pb_1 = require("../proto_out/auth_grpc_pb");
const auth_pb_1 = require("../proto_out/auth_pb");
class ImpAuthService {
    constructor() {
        console.log(`grpc server is running on port ${PORT} ....`);
    }
    authorization(call, callback) {
        const jwt = call.request.getJwt();
        const response = new auth_pb_1.AuthorizationRes();
        console.log("new Grpc request: ", "jwt", jwt.split(".")[1]);
        util
            .verifyJwt(jwt)
            .then((user) => {
            response.setUserId(user.user_id);
            return callback(null, response);
        })
            .catch((err) => {
            const error = {
                name: "user missing",
                message: err,
            };
            console.log("error", error);
            return callback(error, null);
        });
    }
}
const server = new grpc_1.default.Server();
server.addService(auth_grpc_pb_1.authServiceService, new ImpAuthService());
server.bind(`localhost:${PORT}`, grpc_1.default.ServerCredentials.createInsecure());
server.start();
//# sourceMappingURL=server.js.map