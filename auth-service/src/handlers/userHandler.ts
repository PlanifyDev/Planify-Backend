import { Request, Response } from "express";
import { DB } from "../datastore";

export const testHandler = async (_: Request, res: Response) => {
  const user = {
    id: "123",
    firstname: "mostafa",
    lastname: "ahmed",
    image_url: "/img/img1",
    email: "m@m.com",
    password: "pass123",
  };
  try {
    await DB.insertUser(user);
  } catch (error) {
    console.log(error);
  }
  res.send("done");
};
