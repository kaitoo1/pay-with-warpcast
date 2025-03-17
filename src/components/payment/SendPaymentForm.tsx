import React from "react";
import Button from "~/components/Button";
import { formatDisplayAmount } from "~/utils/formatters";

interface SendPaymentFormProps {
  amount: string;
  receivingAddress: string;
  isProcessing: boolean;
  error: string | null;
  buttonText: string;
  onSendPayment: () => void;
  onCancel: () => void;
}

export default function SendPaymentForm({
  amount,
  receivingAddress,
  isProcessing,
  error,
  buttonText,
  onSendPayment,
  onCancel,
}: SendPaymentFormProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
      <div className="w-full pt-8 pb-4 text-center">
        <h1 className="text-2xl font-bold">Send Payment</h1>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center w-full px-6 space-y-6">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-white">
              Amount
            </label>
            <div className="flex items-center p-3 bg-gray-900 rounded">
              <span className="text-xl font-bold">
                {formatDisplayAmount(amount)}
              </span>
              <span className="ml-2 text-gray-400">USDC</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-white">
              Receiving Address
            </label>
            <textarea
              value={receivingAddress}
              readOnly
              className="w-full p-3 bg-gray-900 focus:border-white focus:outline-none text-white placeholder-gray-500 resize-none"
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
      </div>

      <div className="w-full px-6 pb-8 space-y-3">
        <Button
          onClick={onSendPayment}
          className="w-full bg-white text-black hover:bg-gray-200"
          disabled={isProcessing}
        >
          {buttonText}
        </Button>
        <Button
          onClick={onCancel}
          className="w-full bg-transparent border border-white text-white hover:bg-gray-900"
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
