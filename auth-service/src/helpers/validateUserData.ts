import validator from "validator";

export const notValid = (...data: object[]): string | boolean => {
  let mydata = {};
  for (let i = 0; i < data.length; i++) {
    mydata[Object.keys(data[i])[0]] = Object.values(data[i])[0];
  }

  if (mydata["firstname"] && mydata["lastname"]) {
    if (
      !validator.isAlpha(mydata["firstname"]) ||
      !validator.isAlpha(mydata["lastname"])
    ) {
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
    if (!validator.isEmail(mydata["email"])) {
      return "Email is not valid";
    }
  }

  return false;
};
