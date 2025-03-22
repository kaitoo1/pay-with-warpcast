import React, { useMemo } from "react";
import { useWizard } from "~/providers/WizardContext";
import Button from "~/components/Button";
import { useFrameSDK } from "~/providers/FrameSDKContext";
import { useSearchParams } from "next/navigation";

export default function StepOne() {
  const { goNext } = useWizard();
  const { context, signInResult, signInError, isValidFrameContext } =
    useFrameSDK();

  const searchParams = useSearchParams();
  console.log(searchParams.get("testParam"));
  const amount = searchParams.get("amount");
  const merchantName = searchParams.get("merchantName");
  const formattedAmount = useMemo(() => {
    return Number.isInteger(Number(amount))
      ? amount
      : Number(amount).toFixed(2);
  }, [amount]);

  return (
    <div className="bg-black flex flex-col items-center justify-between h-full w-full">
      <div className="flex flex-col items-center mt-8 px-4">
        <div className="m-1 py-2 px-4 rounded-full bg-[#83FF24]">
          Payment Complete
        </div>
        <div className=" p-6 space-y-6">
          {/* <h1 className="text-[24px] font-bold mb-4 text-gray-900">Step 1</h1> */}
          <p className="mt-12 text-2xl  text-center text-white">
            {merchantName}
          </p>
          <div className="flex flex-col">
            <p className="text-xl text-gray-800">Total</p>
            {amount && (
              <div className="flex flex-row items-center">
                <p className="text-7xl font-bold text-white">$</p>
                <p className="text-8xl font-bold text-white">
                  {formattedAmount}
                </p>
              </div>
            )}
            <p className="text-white">You can close the app</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md px-4 mb-6">
        <Button onClick={goNext}>Next</Button>
      </div>
    </div>
  );
}
