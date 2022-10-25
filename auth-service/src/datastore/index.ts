import conn from "./connection";
import { UserDao } from "./dao/userDao";
import { User } from "../contracts/types";

export class UserDataStore implements UserDao {
  insertUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updatePassword(userId: string, newPassword: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateName(
    userId: string,
    first_name: string,
    last_name: string
  ): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUsername(userId: string, username: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateImage(userId: string, newUrl: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  UpdateVerification(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteUser(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
export let DB: UserDao;
export async function initDB() {
  DB = new UserDataStore();
}
