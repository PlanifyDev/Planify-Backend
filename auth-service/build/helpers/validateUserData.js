"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notValid = void 0;
const validator_1 = __importDefault(require("validator"));
const notValid = (...data) => {
    let mydata = {};
    for (let i = 0; i < data.length; i++) {
        mydata[Object.keys(data[i])[0]] = Object.values(data[i])[0];
    }
    if (mydata["firstname"] && mydata["lastname"]) {
        if (!validator_1.default.isAlpha(mydata["firstname"]) ||
            !validator_1.default.isAlpha(mydata["lastname"])) {
            return "Name must only contain alphabetic characters";
        }
        if (mydata["firstname"].length > 15 || mydata["lastname"].length > 15) {
            return "Name is not valid";
        }
    }
    if (mydata["password"]) {
        if (mydata["password"].length < 8) {
            return "Password is too short";
        }
    }
    if (mydata["email"]) {
        if (!validator_1.default.isEmail(mydata["email"])) {
            return "Email is not valid";
        }
    }
    return false;
};
exports.notValid = notValid;
//# sourceMappingURL=validateUserData.js.map