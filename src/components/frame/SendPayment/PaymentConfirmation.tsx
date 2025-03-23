import { memo } from "react";
import Button from "~/components/Button";
import { formatDisplayAmount } from "~/utils/formatters";

type PaymentConfirmationProps = {
  amount: string;
  merchantName: string;
  receivingAddress: string;
  buttonText: string;
  onSendPayment: () => void;
  onCancel: () => void;
};

const PaymentConfirmation = memo(
  ({
    amount,
    merchantName,
    receivingAddress,
    buttonText,
    onSendPayment,
    onCancel,
  }: PaymentConfirmationProps) => {
    return (
      <div className="flex flex-col w-full flex-1 justify-between items-center">
        <div className="flex flex-col flex-1 w-full max-w-md space-y-6 items-center justify-center">
          <div className="flex flex-col space-y-2 items-center">
            <div className="flex items-center p-3">
              <span className="text-8xl font-bold">
                ${formatDisplayAmount(amount)}
              </span>
            </div>
          </div>
          <p className="text-white text-center text-3xl">{merchantName}</p>
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
        </div>
        <div className="w-full px-6 pb-16 space-y-3">
          <Button
            onClick={onSendPayment}
            className={`w-full bg-white hover:bg-gray-200 text-black`}
          >
            <span className="text-black font-bold">{buttonText}</span>
          </Button>
          <Button
            onClick={onCancel}
            className="w-full bg-transparent border border-white text-white hover:bg-gray-900"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
);

export default PaymentConfirmation;
