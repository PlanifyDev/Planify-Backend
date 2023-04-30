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
exports.getVersions = void 0;
const datastore_1 = require("../../datastore");
const helpers_1 = require("../../helpers");
// ---------------------- Get All Versions Handler ----------------------
/**
 * @param req (body: { project_id })
 * @param res (body: { versions })
 * @description
 * 1. check if project id is missing
 * 2. get all versions of the project from DB using project id
 * 3. return versions
 */
const getVersions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { project_id } = req.body;
    if (!project_id) {
        res.status(400).send({ error: "Project ID is missing" });
        return next("Project ID is missing");
    }
    try {
        const versions = yield datastore_1.DB.version.getVersions(project_id);
        res.status(200).send({ versions });
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in get all versions func", error.message);
        return next(myError);
    }
    return next("all versions sent successfully");
});
exports.getVersions = getVersions;
// todo
// get version graph to edit it
//# sourceMappingURL=getVersions.js.map