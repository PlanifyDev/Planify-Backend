import { Payment } from "../../contracts/types";

export interface PaymentDao {
  createPayment(payment: Payment): Promise<void>;

  getSuccessPayments(user_id: string): Promise<Payment[] | undefined>;

  getPaymentPyId(payment_id: string): Promise<Payment | undefined>;

  getAllPayments(user_id: string): Promise<Payment[] | undefined>;

  getLastSuccessPayment(user_id: string): Promise<Payment | undefined>;

  updatePaymentStatus(
    payment_id: string,
    payment_status: string
  ): Promise<void>;

  deletePayment(payment_id: string): Promise<void>;
}
