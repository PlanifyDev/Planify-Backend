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
exports.updateVersionName = void 0;
const datastore_1 = require("../../datastore");
const helpers_1 = require("../../helpers");
// ---------------------- Update Version Name Handler ----------------------
/**
 * @param req (body: { name }, params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version name and id is missing
 * 2. update version name in DB using version id
 * 3. return success
 */
const updateVersionName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).send({ error: "Version name is missing" });
        return next("Version name is missing");
    }
    try {
        yield datastore_1.DB.version.updateVersionName(id, name);
        res.sendStatus(200);
    }
    catch (error) {
        const myError = new helpers_1.MyError("DB Error: in update version name func", error.message);
        return next(myError);
    }
    return next(`version name updated successfully version_id = ${id} `);
});
exports.updateVersionName = updateVersionName;
//# sourceMappingURL=editVersion.js.map