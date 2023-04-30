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
exports.createProject = void 0;
const datastore_1 = require("../../datastore");
// import * as AI from "../../AI";
const ai_client_1 = require("../../gRPC/ai_client/ai_client");
const helpers_1 = require("../../helpers");
/**
 * @param req
 * @param res
 * @param next
 * @returns
 * @description
 * 1. send boundary to AI service and get the images of the project and version
 * 2. create new project with the result
 * 3. create new version with the result
 * 4. return the project and version
 */
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = req.body;
    // ---------------------- 1. send boundary to AI. get project images & icon ----------------------
    let aiResponse;
    const boundary = JSON.stringify(newProject.boundary);
    const door_position = JSON.stringify(newProject.door_position);
    (0, ai_client_1.create_project)(boundary, door_position)
        .then((response) => {
        aiResponse = response;
    })
        .catch((error) => {
        const myError = new helpers_1.MyError("AI service Error: in create project AI service", error.message);
        return next(myError);
    });
    // ---------------------- 2. create new project with the result ----------------------
    const projectDB = Object.assign(Object.assign({}, newProject), { project_img: aiResponse.project_img, project_icon: aiResponse.project_icon });
    let project_id;
    try {
        project_id = yield datastore_1.DB.project.createProject(projectDB);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in create project func", error.message);
        return next(myError);
    }
    const projectInRes = {
        id: project_id,
        name: newProject.name,
        project_img: aiResponse.project_img,
        project_icon: aiResponse.project_icon,
        created_at: new Date(Date.now()).toLocaleString(),
        deleted: false,
    };
    // ---------------------- 4. return the project and version ----------------------
    res.status(200).send({
        project: projectInRes,
    });
    return next("project created successfully");
});
exports.createProject = createProject;
//# sourceMappingURL=createProjectHandler.js.map