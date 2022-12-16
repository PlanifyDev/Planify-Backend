export class payQuery {
  static createPayment = `INSERT INTO payment VALUES($1, $2, $3, $4, $5, $6);`;
  static getSuccessPayments = `SELECT * FROM payment WHERE user_id id = $1 AND payment_status='ok' ;`;
  static getAllPayments = `SELECT * FROM payment WHERE user_id id = $1 ;`;

  static getLastSuccessPayment = `SELECT * FROM payment
                                  WHERE user_id id = $1 AND payment_status='ok'
                                  ORDER BY created_time
                                  LIMIT 1 ;`;

  static updatePaymentStatus = `UPDATE payment
                                SET payment_status = $2,
                                created_data = CURRENT_DATE
                                WHERE payment_id = $1;`;

  static deletePayment = `DELETE FROM payment WHERE payment_id = $1;`;
}
