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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionDataStore = void 0;
const connection_1 = __importDefault(require("../../connection"));
const query_1 = require("../query");
class VersionDataStore {
    createVersion(newVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = [];
            // to ensure the order of the keys
            const keys = ["name", "version_img", "version_icon", "project_id"];
            keys.forEach((key) => {
                version.push(newVersion[key]);
            });
            try {
                const version_id = yield (yield connection_1.default.query(query_1.MyQuery.createVersion, version)).rows[0].id;
                return Promise.resolve(version_id);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getVersions(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.query(query_1.MyQuery.getVersions, [project_id]);
                return Promise.resolve(result.rows);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateVersionName(version_id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.query(query_1.MyQuery.updateVersionName, [name, version_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    moveVersionToTrash(version_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                connection_1.default.query(query_1.MyQuery.moveVersionToTrash, [version_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    restoreVersionFromTrash(version_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                connection_1.default.query(query_1.MyQuery.restoreVersionFromTrash, [version_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    deleteVersion(version_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                connection_1.default.query(query_1.MyQuery.deleteVersion, [version_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.VersionDataStore = VersionDataStore;
//# sourceMappingURL=versions.js.map