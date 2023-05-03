export class MyQuery {
  static insertUser = `INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  static getUserByEmail = `SELECT * FROM users WHERE LOWER(email)=LOWER($1);`;
  static getUserById = `SELECT * FROM users WHERE id=$1;`;
  static updateImg = `UPDATE users SET image_url = $1 WHERE id=$2;`;
  static updateAllData = `UPDATE users
                SET firstname = $1, lastname = $2, image_url = $3, password = $4 , country = $5, role = $6
                WHERE id = $7;`;
  static updateVerification = `UPDATE users SET verified = true WHERE id=$1;`;
  static updatePassword = `UPDATE users SET password = $2 WHERE id=$1;`;
  static updatePlan = `UPDATE users SET user_plan = $2 WHERE id=$1;`;
  static deleteUser = `DELETE FROM users WHERE id = $1;`;
  static clearUsers = `DELETE FROM users;`;
}
