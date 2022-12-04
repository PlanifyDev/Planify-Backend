export class MyQuery {
  static insertUser = `INSERT INTO users VALUES($1, $2, $3, $4, $5, $6);`;
  static getUserByEmail = `SELECT * FROM users WHERE email=$1;`;
  static getUserById = `SELECT * FROM users WHERE id=$1;`;
  static updatePassword = `UPDATE users SET password = $1 WHERE id=$2;`;
  static updateName = `UPDATE users SET firstname = $1, lastname = $2 WHERE id=$3;`;
  static updateImg = `UPDATE users SET image_url = $1 WHERE id=$2;`;
  static updateAllData = `UPDATE users SET firstname = $1, lastname = $2, image_url = $3, password = $4 WHERE id = $5;`;
  static updateVerification = `UPDATE users SET verified = true WHERE id=$1;`;
  static deleteUser = `DELETE FROM users WHERE id = $1;`;
}
