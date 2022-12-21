export class payQuery {
  static createPayment = `INSERT INTO payment VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  static getSuccessPayments = `SELECT * FROM payment WHERE user_id = $1 AND payment_status='ok' ;`;
  static getPaymentPyId = `SELECT * FROM payment WHERE user_id id = $1 ;`;
  static getAllPayments = `SELECT * FROM payment WHERE payment_id id = $1 ;`;

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

export class planQuery {
  static createPlan = `INSERT INTO plans VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
  static getPlan = `SELECT * FROM plans WHERE plan_id = $1 ;`;
  static geyAllPlans = `SELECT * FROM plans ;`;

  static updatePlan = `UPDATE plans
                                SET name = $2,
                                    description = $3,
                                    suggestions = $4,
                                    dwg_file = $5,
                                    design_3D = $6,
                                    edit_design = $7,
                                    monthly_price = $8,
                                    yearly_price = $9,
                                WHERE payment_id = $1;`;

  static deletePlan = `DELETE FROM plans WHERE plan_id = $1;`;
}
