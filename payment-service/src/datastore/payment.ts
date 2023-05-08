import { DB_CONN } from "../connections";
import { PaymentDao } from "./dao/paymentDao";
import { Payment } from "../contracts/types";
import { payQuery } from "./query";
export class PaymentDataStore implements PaymentDao {
  // ------------- Singleton ----------------
  private static instance: PaymentDataStore;
  private constructor() {}
  public static getInstance(): PaymentDataStore {
    if (!PaymentDataStore.instance) {
      PaymentDataStore.instance = new PaymentDataStore();
    }
    return PaymentDataStore.instance;
  }

  async createPayment(payment: Payment): Promise<void> {
    const newPayment: string[] = [];
    for (const key in payment) {
      newPayment.push(payment[key]);
    }
    try {
      await DB_CONN.query(payQuery.createPayment, newPayment);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getSuccessPayments(user_id: string): Promise<Payment[]> {
    try {
      const successPayments = await DB_CONN.query(payQuery.getSuccessPayments, [
        user_id,
      ]);
      return Promise.resolve(successPayments.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteUnsuccessPayment(user_id: string): Promise<void> {
    try {
      await DB_CONN.query(payQuery.deleteUnsuccessPayment, [user_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPaymentPyId(payment_id: string): Promise<Payment> {
    try {
      const payment = await DB_CONN.query(payQuery.getPaymentById, [
        payment_id,
      ]);
      return Promise.resolve(payment.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAllPayments(user_id: string): Promise<Payment[]> {
    try {
      const allPayments = await DB_CONN.query(payQuery.getAllPayments, [
        user_id,
      ]);
      return Promise.resolve(allPayments.rows as Payment[]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getLastSuccessPayment(user_id: string): Promise<Payment> {
    try {
      const lastSuccessPayment = await DB_CONN.query(
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
    payment_status: string,
    created_date: string,
    payer_id: string
  ): Promise<void> {
    try {
      await DB_CONN.query(payQuery.updatePaymentStatus, [
        payment_id,
        payment_status,
        created_date,
        payer_id,
      ]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deletePayment(payment_id: string): Promise<void> {
    try {
      await DB_CONN.query(payQuery.deletePayment, [payment_id]);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const dbPayment = PaymentDataStore.getInstance();
