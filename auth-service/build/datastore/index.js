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
exports.DB = exports.UserDataStore = void 0;
const connection_1 = __importDefault(require("../connection"));
const query_1 = require("./query");
class UserDataStore {
    insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = [];
            for (const key in user) {
                newUser.push(user[key]);
            }
            try {
                yield connection_1.default.query(query_1.MyQuery.insertUser, newUser);
                return Promise.resolve();
            }
            catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield connection_1.default.query(query_1.MyQuery.getUserByEmail, [email]);
                return Promise.resolve(user.rows[0]);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getUserById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield connection_1.default.query(query_1.MyQuery.getUserById, [user_id]);
                return Promise.resolve(user.rows[0]);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateImg(user_id, newUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.query(query_1.MyQuery.updateImg, [newUrl, user_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateAllData(user_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newData = [];
            for (const key in user) {
                newData.push(user[key]);
            }
            newData.push(user_id);
            try {
                yield connection_1.default.query(query_1.MyQuery.updateAllData, newData);
                return Promise.resolve();
            }
            catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        });
    }
    //  update password
    updatePassword(user_id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.query(query_1.MyQuery.updatePassword, [user_id, password]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateVerification(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.query(query_1.MyQuery.updateVerification, [user_id]);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    deleteUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.query(query_1.MyQuery.deleteUser, [user_id]);
                Promise.resolve();
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
    clearUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.query(query_1.MyQuery.clearUsers);
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error.message);
            }
        });
    }
}
exports.UserDataStore = UserDataStore;
exports.DB = new UserDataStore();
//# sourceMappingURL=index.js.map