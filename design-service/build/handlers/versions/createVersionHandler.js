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
exports.createVersion = void 0;
const datastore_1 = require("../../datastore");
// import * as AI from "../../AI";
const ai_client_1 = require("../../gRPC/ai_client/ai_client");
const helpers_1 = require("../../helpers");
/**
 * @param req (body: { project_id })
 * @param res (body: { version: versionInRes })
 * @description
 * 1. get the project data from DB
 * 2. send boundary and constrains to AI service and get the images of the version
 * 3. Insert the new version with the result to the DB
 * 4. return the version to client
 */
const createVersion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { project_id } = req.body;
    // ---------------------- 1. get the project data from DB ----------------------
    let project;
    try {
        project = yield datastore_1.DB.project.getProject(project_id);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in create version handler when getting project data", error.message);
        return next(myError);
    }
    // ---------------------- 2. send boundary and constrains to AI. get version images ----------------------
    let aiResponse;
    const boundary = JSON.stringify(project.boundary);
    const door_position = JSON.stringify(project.door_position);
    const constraints = JSON.stringify(project.constraints);
    (0, ai_client_1.create_version)(boundary, door_position, constraints)
        .then((response) => {
        aiResponse = response;
    })
        .catch((error) => {
        const myError = new helpers_1.MyError("AI service Error: in create version AI service", error.message);
        return next(myError);
    });
    // ---------------------- 3. Insert the new version with the result to the DB ----------------------
    const versionDB = {
        name: "New Version",
        version_img: aiResponse.version_img,
        version_icon: aiResponse.version_icon,
        project_id,
    };
    let version_id;
    try {
        version_id = yield datastore_1.DB.version.createVersion(versionDB);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in create version func", error.message);
        return next(myError);
    }
    const versionInRes = {
        id: version_id,
        name: "New Version",
        version_img: aiResponse.version_img,
        version_icon: aiResponse.version_icon,
        created_at: new Date(Date.now()).toLocaleString(),
        deleted: false,
        project_id,
    };
    // ---------------------- 4. return the version to client ----------------------
    res.status(200).send({ version: versionInRes });
    return next("project created successfully");
});
exports.createVersion = createVersion;
//# sourceMappingURL=createVersionHandler.js.map