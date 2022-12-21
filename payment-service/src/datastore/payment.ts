import conn from "../connection";
import { PaymentDao } from "./dao/paymentDao";
import { Payment } from "../contracts/types";
import { payQuery } from "./query";
export class PaymentDataStore implements PaymentDao {
  async createPayment(payment: Payment): Promise<void> {
    const newPayment: string[] = [];
    for (const key in payment) {
      newPayment.push(payment[key]);
    }
    try {
      await conn.query(payQuery.createPayment, newPayment);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getSuccessPayments(user_id: string): Promise<Payment[]> {
    try {
      const successPayments = await conn.query(payQuery.getSuccessPayments, [
        user_id,
      ]);
      return Promise.resolve(successPayments.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPaymentPyId(payment_id: string): Promise<Payment> {
    try {
      const payment = await conn.query(payQuery.getPaymentPyId, [payment_id]);
      return Promise.resolve(payment.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAllPayments(user_id: string): Promise<Payment[]> {
    try {
      const allPayments = await conn.query(payQuery.getAllPayments, [user_id]);
      return Promise.resolve(allPayments.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getLastSuccessPayment(user_id: string): Promise<Payment> {
    try {
      const lastSuccessPayment = await conn.query(
        payQuery.getLastSuccessPayment,
        [user_id]
      );
      return Promise.resolve(lastSuccessPayment.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updatePaymentStatus(
    payment_id: string,
    payment_status: string
  ): Promise<void> {
    try {
      await conn.query(payQuery.updatePaymentStatus, [
        payment_id,
        payment_status,
      ]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deletePayment(payment_id: string): Promise<void> {
    try {
      await conn.query(payQuery.deletePayment, [payment_id]);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const dbPayment = new PaymentDataStore();
