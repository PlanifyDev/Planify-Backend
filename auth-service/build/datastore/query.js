"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQuery = void 0;
class MyQuery {
}
exports.MyQuery = MyQuery;
MyQuery.insertUser = `INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
MyQuery.getUserByEmail = `SELECT * FROM users WHERE email=$1;`;
MyQuery.getUserById = `SELECT * FROM users WHERE id=$1;`;
MyQuery.updateImg = `UPDATE users SET image_url = $1 WHERE id=$2;`;
MyQuery.updateAllData = `UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4;`;
MyQuery.updateVerification = `UPDATE users SET verified = true WHERE id=$1;`;
MyQuery.updatePassword = `UPDATE users SET password = $2 WHERE id=$1;`;
MyQuery.deleteUser = `DELETE FROM users WHERE id = $1;`;
MyQuery.clearUsers = `DELETE FROM users;`;
//# sourceMappingURL=query.js.map