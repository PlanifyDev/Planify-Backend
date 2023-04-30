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
exports.deleteProject = exports.restoreProjectTrash = exports.moveProjectToTrash = void 0;
const datastore_1 = require("../../datastore");
const helpers_1 = require("../../helpers");
// ---------------------- move project to trash handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if project id is missing
 * 2. update project trashed status to true in DB s
 */
const moveProjectToTrash = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "Project ID is missing" });
        return next("Project ID is missing");
    }
    try {
        yield datastore_1.DB.project.moveProjectToTrash(id);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in move project to trash func", error.message);
        return next(myError);
    }
    return next(`Project moved to trash successfully, project_id = ${id} `);
});
exports.moveProjectToTrash = moveProjectToTrash;
// ---------------------- restore project from trash handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if project id is missing
 * 2. update project trashed status to false in DB
 */
const restoreProjectTrash = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "Project ID is missing" });
        return next("Project ID is missing");
    }
    try {
        yield datastore_1.DB.project.restoreProjectFromTrash(id);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in restore project from trash func", error.message);
        return next(myError);
    }
    return next(`Project restored from trash successfully, project_id = ${id} `);
});
exports.restoreProjectTrash = restoreProjectTrash;
// ---------------------- delete project permanently handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if project id is missing
 * 2. delete project from DB
 * 3. delete all versions of this project from DB (cascade delete in SQL)
 */
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "Project ID is missing" });
        return next("Project ID is missing");
    }
    try {
        yield datastore_1.DB.project.deleteProject(id);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in delete project permanently func", error.message);
        return next(myError);
    }
    return next(`Project deleted permanently successfully, project_id = ${id} `);
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=deleteProject.js.map