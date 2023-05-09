export enum ERRORS {
  TOKEN_EXPIRED = "Token expired",
  BAD_TOKEN = "Bad token",
  USER_NOT_FOUND = "User not found",
  DUPLICATE_EMAIL = "An account with this email already exists",
  WRONG_LOGIN = "Wrong Email or Password",
  NOT_AUTHORIZED = "Not Authorized",
  BAD_VERIFY_RUL = "Invalid verification URL ",
  NOT_VERIFIED = "This account has not been verified",
  USER_REQUIRED_FIELDS = "Email, username, and password are required",
}

export class NewError extends Error {
  errorObj: any;
  statusCode: number;
  constructor(message: string, errorObj: any, statusCode: number) {
    super(message);
    this.errorObj = errorObj;
    this.statusCode = statusCode;
  }
}
