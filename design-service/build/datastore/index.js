"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const projects_1 = require("./implements/projects");
const versions_1 = require("./implements/versions");
class DataStore {
    constructor() {
        this.project = new projects_1.projectDataStore();
        this.version = new versions_1.VersionDataStore();
    }
}
exports.DB = new DataStore();
//# sourceMappingURL=index.js.map