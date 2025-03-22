import React, { FC, memo } from "react";
import ProcessingPayment from "~/components/frame/SendPayment/ProcessingPayment";
import PaymentConfirmation from "~/components/frame/SendPayment/PaymentConfirmation";
import ErrorMessage from "~/components/frame/SendPayment/ErrorMessage";

interface SendPaymentFormProps {
  amount: string;
  receivingAddress: string;
  merchantName: string;
  isProcessing: boolean;
  error: string | null;
  buttonText: string;
  onSendPayment: () => void;
  onCancel: () => void;
}

const SendPaymentForm: FC<SendPaymentFormProps> = memo(
  ({
    amount,
    receivingAddress,
    merchantName,
    isProcessing,
    error,
    buttonText,
    onSendPayment,
    onCancel,
  }) => {
    return (
      <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white ">
        <div className="w-full pt-8 pb-4 text-center">
          <h1 className="text-2xl font-bold">Pay</h1>
        </div>
        {error && <ErrorMessage error={error} />}
        <div className="flex flex-col flex-1 w-full">
          {isProcessing ? (
            <ProcessingPayment />
          ) : (
            <PaymentConfirmation
              amount={amount}
              merchantName={merchantName}
              receivingAddress={receivingAddress}
              buttonText={buttonText}
              onSendPayment={onSendPayment}
              onCancel={onCancel}
            />
          )}
        </div>
      </div>
    );
  }
);

export default SendPaymentForm;
