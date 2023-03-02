import * as type from "../../contracts/types";

export interface UserDao {
  insertUser(user: type.User): Promise<void>;

  getUserByEmail(email: string): Promise<type.User | undefined>;

  getUserById(user_id: string): Promise<type.User | undefined>;

  updateImg(user_id: string, newUrl: string): Promise<void>;

  updateAllData(user_id: string, newUser: type.UserUpdateData): Promise<void>;

  updateVerification(user_id: string): Promise<void>;

  deleteUser(user_id: string): Promise<void>;

  clearUsers(): Promise<void>;
}
