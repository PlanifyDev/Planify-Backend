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
exports.updateProjectName = void 0;
const datastore_1 = require("../../datastore");
const helpers_1 = require("../../helpers");
// ---------------------- update project name handler ----------------------
/**
 * @param req (params: { id }) (body: { name, user_id })
 * @param res (status: 200)
 * @description
 * 1. check if project name and id is missing
 * 2. update project name in DB
 */
const updateProjectName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).send({ error: "Project name is missing" });
        return next("Project name is missing");
    }
    if (!id) {
        res.status(400).send({ error: "Project ID is missing" });
        return next("Project ID is missing");
    }
    try {
        yield datastore_1.DB.project.updateProjectName(id, name);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in update project name func", error.message);
        return next(myError);
    }
    return next(`Project name updated successfully, project_id = ${id}`);
});
exports.updateProjectName = updateProjectName;
//# sourceMappingURL=editProject.js.map