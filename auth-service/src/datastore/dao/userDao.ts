import { User } from "../../contracts/types";

export interface UserDao {
  insertUser(user: User): Promise<void>;

  getUserByEmail(email: string): Promise<User | undefined>;

  getUserByUsername(username: string): Promise<User | undefined>;

  updatePassword(userId: string, newPassword: string): Promise<void>;

  updateName(
    userId: string,
    first_name: string,
    last_name: string
  ): Promise<User | undefined>;

  updateUsername(userId: string, username: string): Promise<void>;

  updateImage(userId: string, newUrl: string): Promise<void>;

  UpdateVerification(userId: string): Promise<void>;

  deleteUser(userId: string): Promise<void>;
}
