import React, { FC, memo } from "react";
import SendPayment from "../SendPayments/SendPayment";

const SendPaymentScreen: FC = memo(() => {
  return (
    <div className="flex flex-col h-screen">
      <SendPayment />
    </div>
  );
});

export default SendPaymentScreen;
