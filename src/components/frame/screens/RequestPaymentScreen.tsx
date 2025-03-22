import React, { FC } from "react";
import RequestPayment from "~/components/frame/RequestPayment/RequestPayment";

const RequestPaymentScreen: FC = () => {
  return (
    <div className="flex flex-col h-screen px-4">
      <RequestPayment />
    </div>
  );
};

export default RequestPaymentScreen;
