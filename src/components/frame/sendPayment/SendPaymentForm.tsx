import React, { FC, memo } from "react";
import Button from "~/components/Button";
import { formatDisplayAmount } from "~/utils/formatters";
import ProcessingPayment from "./ProcessingPayment";
import PaymentConfirmation from "./PaymentConfirmation";
import ErrorMessage from "./ErrorMessage";

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
