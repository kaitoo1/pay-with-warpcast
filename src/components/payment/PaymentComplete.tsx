import React from "react";
import Button from "~/components/Button";
import { formatDisplayAmount } from "~/utils/formatters";

interface PaymentCompleteProps {
  amount: string;
  receivingAddress: string;
  transactionHash: string | null;
  onGoHome: () => void;
}

export default function PaymentComplete({
  amount,
  receivingAddress,
  transactionHash,
  onGoHome,
}: PaymentCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
      <div className="w-full pt-8 pb-4 text-center">
        <h1 className="text-2xl font-bold">Payment Complete!</h1>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center w-full px-6 space-y-6">
        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xl font-semibold">
            You sent {formatDisplayAmount(amount)} USDC
          </p>
          <p className="text-sm text-gray-400 break-all">
            To: {receivingAddress}
          </p>
          {transactionHash && (
            <p className="text-xs text-gray-500 mt-4">
              Transaction: {transactionHash.substring(0, 10)}...
              {transactionHash.substring(transactionHash.length - 8)}
            </p>
          )}
        </div>
      </div>

      <div className="w-full px-6 pb-8">
        <Button
          onClick={onGoHome}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
