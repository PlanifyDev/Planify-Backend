"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateAllHandler = void 0;
const datastore_1 = require("../datastore");
const help = __importStar(require("../helpers"));
const cache_1 = require("../cache");
// ----------------- update name and password ------------------------------
const updateAllHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // ------ check validation of new data -------
    const notValidMsg = help.notValid({ firstname: req.body.firstname }, { lastname: req.body.lastname }, { password: req.body.password });
    if (notValidMsg) {
        return res.status(400).send({ error: notValidMsg });
    }
    // -------------------------------------------
    // ----------- get user data from DB --------
    let user;
    try {
        user = yield datastore_1.DB.getUserById(res.locals.userId);
    }
    catch (error) {
        return next(error);
    }
    const firstname = req.body.firstname || user.firstname;
    const lastname = req.body.lastname || user.lastname;
    let password = user.password;
    // ---- if he need to change password must pass old password ---------
    if (req.body.password) {
        if (!req.body.oldPassword) {
            return res
                .status(400)
                .send({ error: "Old password is required to update " });
        }
        if (help.notValid({ password: req.body.oldPassword })) {
            return res.status(400).send({ error: "Wrong password" });
        }
        // ------------ check if old password is correct -----------
        const isMatch = yield help.comparePassword(req.body.oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "Wrong password" });
        }
        // ---- hash new password to save in DB -------------------
        password = yield help.hashPassword(req.body.password);
    }
    const newUser = {
        firstname,
        lastname,
        password,
    };
    // ------------- update name in cache ----------------------
    yield cache_1.cache.updateNameCache(user.id, firstname, lastname).catch((error) => {
        return next(error);
    });
    // ------------- send new data to update db ---------------
    yield datastore_1.DB.updateAllData(user.id, newUser).catch((error) => {
        return next(error);
    });
    return res.sendStatus(200);
});
exports.updateAllHandler = updateAllHandler;
//# sourceMappingURL=updateAllHandler.js.map