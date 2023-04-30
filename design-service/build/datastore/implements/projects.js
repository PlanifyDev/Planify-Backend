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
exports.projectDataStore = void 0;
const connection_1 = __importDefault(require("../../connection"));
const query_1 = require("../query");
class projectDataStore {
    /**
     * @param newProjectDB
     * @returns
     * project_id: number
     * @description
     * this function takes in a newProjectDB object
     * and returns the project_id of the newly created project
     * first it creates an array of the keys of the newProjectDB object
     * then it creates a new array of the values of the newProjectDB object to ensure the order of the keys
     * then it creates a new project in the database and returns the project_id
     */
    createProject(newProjectDB) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = [];
            // to ensure the order of the keys
            const keys = [
                "name",
                "boundary",
                "door_position",
                "constraints",
                "project_img",
                "project_icon",
                "user_id",
            ];
            keys.forEach((key) => {
                project.push(newProjectDB[key]);
            });
            try {
                const project_id = yield (yield connection_1.default.query(query_1.MyQuery.createProject, project)).rows[0].id;
                return Promise.resolve(project_id);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getProject(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.query(query_1.MyQuery.getProject, [project_id]);
                return Promise.resolve(result.rows[0]);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getProjectCopy(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.query(query_1.MyQuery.getProjectCopy, [project_id]);
                return Promise.resolve(result.rows[0]);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getProjects(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.query(query_1.MyQuery.getProjects, [user_id]);
                return Promise.resolve(result.rows);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateProjectName(project_id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.query(query_1.MyQuery.updateProjectName, [name, project_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    moveProjectToTrash(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                connection_1.default.query(query_1.MyQuery.moveProjectToTrash, [project_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    restoreProjectFromTrash(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                connection_1.default.query(query_1.MyQuery.restoreProjectFromTrash, [project_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
            //
        });
    }
    deleteProject(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                connection_1.default.query(query_1.MyQuery.deleteProject, [project_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
            //
        });
    }
}
exports.projectDataStore = projectDataStore;
//# sourceMappingURL=projects.js.map