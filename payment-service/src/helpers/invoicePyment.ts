import { accessEnv } from ".";

export const create_payment_json = (
  totalAmount: number,
  payment_description: string
) => {
  const obj = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: accessEnv("RETURN_URL"),
      cancel_url: accessEnv("CANCEL_URL"),
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalAmount.toString(),
        },
        description: payment_description,
      },
    ],
  };

  return obj;
};
