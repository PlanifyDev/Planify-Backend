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
exports.deleteVersion = exports.restoreVersionTrash = exports.moveVersionToTrash = void 0;
const datastore_1 = require("../../datastore");
const helpers_1 = require("../../helpers");
// ---------------------- Move Version To Trash Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version id is missing
 * 2. move version to trash in DB using version id
 * 3. return success
 */
const moveVersionToTrash = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "Version ID is missing" });
        return next("Version ID is missing");
    }
    try {
        yield datastore_1.DB.version.moveVersionToTrash(id);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in move version to trash func", error.message);
        return next(myError);
    }
    return next(`version moved to trash successfully version_id = ${id} `);
});
exports.moveVersionToTrash = moveVersionToTrash;
// ---------------------- Restore Version From Trash Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version id is missing
 * 2. restore version from trash in DB using version id
 * 3. return success
 */
const restoreVersionTrash = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "Version ID is missing" });
        return next("Version ID is missing");
    }
    try {
        yield datastore_1.DB.version.restoreVersionFromTrash(id);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in restore version from trash func", error.message);
        return next(myError);
    }
    return next(`version restored from trash successfully version_id = ${id} `);
});
exports.restoreVersionTrash = restoreVersionTrash;
// ---------------------- Delete Version Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version id is missing
 * 2. delete version from DB using version id
 * 3. return success
 */
const deleteVersion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "Version ID is missing" });
        return next("Version ID is missing");
    }
    try {
        yield datastore_1.DB.version.deleteVersion(id);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in delete version func", error.message);
        return next(myError);
    }
    return next(`version deleted successfully version_id = ${id} `);
});
exports.deleteVersion = deleteVersion;
//# sourceMappingURL=deleteVersion.js.map