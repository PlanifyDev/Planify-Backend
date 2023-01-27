import conn from "../connection";
import { UserDao } from "./dao/userDao";
import { User, UserDB, UserNewData } from "../contracts/types";
import { MyQuery } from "./query";
export class UserDataStore implements UserDao {
  async insertUser(user: User): Promise<void> {
    const newUser: string[] = [];
    for (const key in user) {
      newUser.push(user[key]);
    }
    try {
      await conn.query(MyQuery.insertUser, newUser);
      return Promise.resolve();
    } catch (error) {
      console.log(error);

      return Promise.reject(error);
    }
  }

  async getUserByEmail(email: string): Promise<UserDB> {
    try {
      const user = await conn.query(MyQuery.getUserByEmail, [email]);
      return Promise.resolve(user.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getUserById(user_id: string): Promise<UserDB> {
    try {
      const user = await conn.query(MyQuery.getUserById, [user_id]);
      return Promise.resolve(user.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateImg(user_id: string, newUrl: string): Promise<void> {
    try {
      await conn.query(MyQuery.updateImg, [newUrl, user_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateAllData(user_id: string, user: UserNewData): Promise<void> {
    const newData: string[] = [];
    for (const key in user) {
      newData.push(user[key]);
    }

    newData.push(user_id);

    try {
      await conn.query(MyQuery.updateAllData, newData);
      return Promise.resolve();
    } catch (error) {
      console.log(error);

      return Promise.reject(error);
    }
  }

  async updateVerification(user_id: string): Promise<void> {
    try {
      await conn.query(MyQuery.updateVerification, [user_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteUser(user_id: string): Promise<void> {
    try {
      await conn.query(MyQuery.deleteUser, [user_id]);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  }

  async clearUsers(): Promise<void> {
    try {
      await conn.query(MyQuery.clearUsers);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const DB = new UserDataStore();
