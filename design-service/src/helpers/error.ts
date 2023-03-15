/**
 * @class MyError
 * @description This class is used to create custom error object
 * @param {string} message - error message
 * @param {any} errorObj - error object
 * @returns {MyError} - custom error object
 */
export class MyError extends Error {
  errorObj: any;
  constructor(message: string, errorObj: any) {
    super(message);
    this.errorObj = errorObj;
  }
}
