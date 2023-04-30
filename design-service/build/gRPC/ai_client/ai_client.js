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
exports.create_version = exports.create_project = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const path_1 = __importDefault(require("path"));
const help = __importStar(require("../../helpers"));
const AI_GRPC_URL = help.accessEnv("AI_GRPC_URL");
// path to our proto file
const PROTO_FILE = path_1.default.join(__dirname, "../proto/ai_service.proto");
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
//ai_service is the package name in our proto file
const aiService = grpc.loadPackageDefinition(pkgDefs).ai_service;
// create client
const client = new aiService.AI(AI_GRPC_URL, grpc.credentials.createInsecure());
const create_project = (boundary, door_position) => {
    return new Promise((resolve, reject) => {
        const request = { boundary, door_position };
        client.create_project(request, (err, response) => {
            if (err) {
                console.log(err);
                return reject(response.status);
            }
            return resolve(response);
        });
    });
};
exports.create_project = create_project;
const create_version = (boundary, door_position, constraints) => {
    return new Promise((resolve, reject) => {
        const request = { boundary, door_position };
        client.create_version(request, (err, response) => {
            if (err) {
                console.log(err);
                return reject(response.status);
            }
            return resolve(response);
        });
    });
};
exports.create_version = create_version;
//# sourceMappingURL=ai_client.js.map