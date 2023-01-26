export class MyQuery {
  static insertUser = `INSERT INTO users VALUES($1, $2, $3, $4, $5, $6);`;
  static getUserByEmail = `SELECT * FROM users WHERE email=$1;`;
  static getUserById = `SELECT * FROM users WHERE id=$1;`;
  static updateImg = `UPDATE users SET image_url = $1 WHERE id=$2;`;
  static updateAllData = `UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4;`;
  static updateVerification = `UPDATE users SET verified = true WHERE id=$1;`;
  static deleteUser = `DELETE FROM users WHERE id = $1;`;
  static clearUsers = `DELETE FROM users;`;
}
