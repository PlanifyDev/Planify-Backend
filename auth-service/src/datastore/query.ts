export class MyQuery {
  static insertUser = `INSERT INTO users VALUES($1, $2, $3, $4, $5, $6)`;
  static getUserByEmail = `SELECT * FROM users WHERE email=$1`;
  static getUserById = `SELECT * FROM users WHERE id=$1`;
  static updatePassword = `UPDATE users SET password = $1 WHERE id=$2`;
  static updateName = `UPDATE users SET first_name = $1, last_name = $2 WHERE id=$3`;
  static updateImg = `UPDATE users SET image_url = $1 WHERE id=$2`;
  static updateVerification = `UPDATE users SET verified = true WHERE id=$2`;
  static deleteUser = `DELETE FROM users WHERE id = $1`;
}
