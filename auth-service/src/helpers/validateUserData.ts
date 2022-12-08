import validator from "validator";

export const signUpValidator = (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): string | boolean => {
  if (!firstname || !lastname || !email || !password) {
    return "Email, username, and password are required";
  }

  if (!validator.isAlpha(firstname) || !validator.isAlpha(lastname)) {
    return "Name must only contain alphabetic characters";
  }

  if (firstname.length > 15 || lastname.length > 15) {
    return "Name is not valid";
  }

  if (password.length < 8) {
    return "Password is too short";
  }

  if (!validator.isEmail(email)) {
    return "Email is not valid";
  }

  return false;
};

export const signInValidator = (
  email: string,
  password: string
): string | boolean => {
  if (!email || !password) {
    return "Wrong Email or Password";
  }

  if (password.length < 8) {
    return "Password is too short";
  }

  if (!validator.isEmail(email)) {
    return "Email is not valid";
  }

  return false;
};
