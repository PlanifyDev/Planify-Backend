"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyError = void 0;
/**
 * @class MyError
 * @description This class is used to create custom error object
 * @param {string} message - error message
 * @param {any} errorObj - error object
 * @returns {MyError} - custom error object
 */
class MyError extends Error {
    constructor(message, errorObj) {
        super(message);
        this.errorObj = errorObj;
    }
}
exports.MyError = MyError;
//# sourceMappingURL=error.js.map