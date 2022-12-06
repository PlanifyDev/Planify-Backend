import { User, UserDB, UserNewData } from "../../contracts/types";

export interface UserDao {
  insertUser(user: User): Promise<void>;

  getUserByEmail(email: string): Promise<UserDB | undefined>;

  getUserById(user_id: string): Promise<UserDB | undefined>;

  updatePassword(user_id: string, newPassword: string): Promise<void>;

  updateName(
    user_id: string,
    first_name: string,
    last_name: string
  ): Promise<void>;

  updateImg(user_id: string, newUrl: string): Promise<void>;

  updateAllData(user_id: string, newUser: UserNewData): Promise<void>;

  updateVerification(user_id: string): Promise<void>;

  deleteUser(user_id: string): Promise<void>;
  clearUsers(): Promise<void>;
}
