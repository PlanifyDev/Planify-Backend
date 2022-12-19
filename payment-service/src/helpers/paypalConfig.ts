import { accessEnv } from "./accessEnv";
import paypal from "paypal-rest-sdk";
export const paypalConfig = () => {
  paypal.configure({
    mode: "live", //sandbox or live
    client_id: accessEnv("PAYPAL_ID"),
    client_secret: accessEnv("PAYPAL_SECRET"),
  });
};
