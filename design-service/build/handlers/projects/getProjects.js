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
exports.copyProject = exports.getProjects = void 0;
const datastore_1 = require("../../datastore");
const helpers_1 = require("../../helpers");
// ---------------------- Get All Projects Handler ----------------------
/**
 * @param req (body: { user_id })
 * @param res (body: { projects: projectRes[] })
 * @description
 * get all projects from DB using user id )
 * 1- get user id from res.locals
 * 2- get all projects from DB using user id
 * 3- return all projects
 */
const getProjects = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = res.locals.userId;
    try {
        const projects = yield datastore_1.DB.project.getProjects(user_id);
        res.status(200).send({ projects });
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in get all project func", error.message);
        return next(myError);
    }
    return next("all projects sent successfully");
});
exports.getProjects = getProjects;
// ---------------------- Get Copy Of Project Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (body: { project: projectCopy }) boundary, door_position, constraints
 * @description
 * get copy of project from DB using project id to make a new project with same "boundary"
 * 1- get project id from req.params
 * 2- get project from DB using project id
 * 3- return project to client
 */
const copyProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "Project ID is missing" });
        return next("Project ID is missing");
    }
    try {
        const project = yield datastore_1.DB.project.getProjectCopy(id);
        res.status(200).send({ project });
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in copy project func", error.message);
        return next(myError);
    }
    return next(`project copied successfully project_id = ${id} `);
});
exports.copyProject = copyProject;
//# sourceMappingURL=getProjects.js.map