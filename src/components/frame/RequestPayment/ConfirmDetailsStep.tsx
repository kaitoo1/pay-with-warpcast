import { memo, useCallback } from "react";
import BackButton from "~/components/BackButton";
import { formatDisplayAmount } from "~/utils/formatters";

type ConfirmDetailsStepProps = {
  navigateToNumpadStep: () => void;
  navigateToQRCodeStep: () => void;
  amount: string;
  merchantName: string;
  setMerchantName: (merchantName: string) => void;
  receivingAddress: string;
  setReceivingAddress: (receivingAddress: string) => void;
};

const ConfirmDetailsStep = memo(
  ({
    navigateToNumpadStep,
    navigateToQRCodeStep,
    amount,
    merchantName,
    setMerchantName,
    receivingAddress,
    setReceivingAddress,
  }: ConfirmDetailsStepProps) => {
    const handleBack = useCallback(() => {
      navigateToNumpadStep();
    }, [navigateToNumpadStep]);

    const handleNext = useCallback(() => {
      navigateToQRCodeStep();
    }, [navigateToQRCodeStep]);

    const handleMerchantNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setMerchantName(e.target.value);
      },
      [setMerchantName]
    );

    const handleReceivingAddressChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReceivingAddress(e.target.value);
      },
      [setReceivingAddress]
    );

    return (
      <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white px-4">
        <div className="w-full mt-8 relative  text-center flex items-center justify-center">
          <BackButton onClick={handleBack} />
          <h1 className="text-2xl font-bold">Confirm Details</h1>
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-center ">
          <div className=" w-full space-y-14">
            <div className="text-center mb-6 space-y-2">
              <label className="text-sm font-bold text-center text-gray-600">
                Amount
              </label>
              <p className="text-5xl font-bold pt-1">
                ${formatDisplayAmount(amount)}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-center  text-gray-600">
                Displayed Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={merchantName}
                  onChange={handleMerchantNameChange}
                  placeholder="Enter merchant name"
                  className="bg-transparent border-2 border-transparent w-full p-1 bg-black text-center focus:border-white focus:outline-none text-white text-3xl placeholder-gray-500 px-10"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-center  text-gray-600">
                Receiving Address
              </label>
              <div className="relative">
                <textarea
                  value={receivingAddress}
                  onChange={handleReceivingAddressChange}
                  placeholder="Enter a Base address"
                  className="bg-transparent border-2 border-transparent rounded-lg w-full p-1 bg-black focus:border-white focus:outline-none text-white placeholder-gray-500 resize-none px-10"
                  style={{
                    overflow: "hidden",
                    wordBreak: "break-all",
                    height: "auto",
                  }}
                  rows={2}
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full">
          <button
            onClick={handleNext}
            className="w-full bg-white text-black py-3 rounded-lg font-medium"
          >
            Generate QR Code
          </button>
        </div>
      </div>
    );
  }
);

export default ConfirmDetailsStep;
