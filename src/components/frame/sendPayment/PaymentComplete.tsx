import React, { FC, memo } from "react";
import Button from "~/components/Button";
import { useFrameSDK } from "~/providers/FrameSDKContext";
import { formatDisplayAmount } from "~/utils/formatters";

interface PaymentCompleteProps {
  amount: string;
  receivingAddress: string;
  transactionHash: string | null;
  onGoHome: () => void;
}

const PaymentComplete: FC<PaymentCompleteProps> = memo(
  ({ amount, receivingAddress, transactionHash, onGoHome }) => {
    const { context } = useFrameSDK();
    return (
      <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
        <div className="w-full pt-8 pb-4 text-center">
          <h1 className="text-2xl font-bold">Payment Complete!</h1>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center w-full px-6 space-y-6">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#4EFF4E"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="text-center space-y-6">
            <div className="flex flex-col items-center ">
              <p className="text-2xl font-semibold">
                You paid ${formatDisplayAmount(amount)}
              </p>
              <p className="text-2xl font-bold">to The Krusty Krab</p>
            </div>
            <p className="italic mb-8">
              &quot;Thank you {context?.user?.username}!&quot;
            </p>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-400 break-all mt-12">
                Sent to: {receivingAddress.substring(0, 10)}...
                {receivingAddress.substring(receivingAddress.length - 8)}
              </p>
              {transactionHash && (
                <p className="text-sm text-gray-400 mt-4">
                  Transaction: {transactionHash.substring(0, 10)}...
                  {transactionHash.substring(transactionHash.length - 8)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full px-6 pb-16">
          <Button
            onClick={onGoHome}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            <span className="text-black font-bold">Close</span>
          </Button>
        </div>
      </div>
    );
  }
);

export default PaymentComplete;
