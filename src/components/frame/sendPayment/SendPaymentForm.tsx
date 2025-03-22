import React, { FC, memo } from "react";
import Button from "~/components/Button";
import { formatDisplayAmount } from "~/utils/formatters";

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
      <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
        <div className="w-full pt-8 pb-4 text-center">
          <h1 className="text-2xl font-bold">Pay</h1>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center w-full px-6 space-y-6">
          {isProcessing ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
              <p className="text-2xl font-medium">Sending...</p>
              <p className="text-gray-400 text-center max-w-xs">
                Please wait while your transaction is being processed. This may
                take a moment.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md space-y-6">
              <div className="flex flex-col space-y-2 items-center">
                <div className="flex items-center p-3">
                  <span className="text-8xl font-bold">
                    ${formatDisplayAmount(amount)}
                  </span>
                </div>
              </div>
              <p className="text-white text-sm text-center text-4xl">
                {merchantName}
                The Krusty Krab
              </p>
              <div className="flex flex-col space-y-2">
                <textarea
                  value={receivingAddress}
                  readOnly
                  className="w-full p-3 text-xs text-center bg-transparent focus:border-white focus:outline-none text-gray-400 placeholder-gray-500 resize-none"
                  style={{
                    overflow: "hidden",
                    wordBreak: "break-all",
                    height: "auto",
                  }}
                  rows={2}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900 text-white rounded text-center">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {!isProcessing && (
          <div className="w-full px-6 pb-8 space-y-3">
            <Button
              onClick={onSendPayment}
              className={`w-full ${
                isProcessing
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-white hover:bg-gray-200"
              } text-black`}
              disabled={isProcessing}
            >
              <span className="text-black font-bold">
                {isProcessing ? "Processing..." : buttonText}
              </span>
            </Button>
            <Button
              onClick={onCancel}
              className="w-full bg-transparent border border-white text-white hover:bg-gray-900"
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }
);

export default SendPaymentForm;
