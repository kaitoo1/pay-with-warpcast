import React from "react";
import { useWizard } from "~/providers/WizardContext";
import Button from "~/components/Button";

export default function Home() {
  const { goToStep } = useWizard();

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
      {/* Header */}
      <div className="w-full pt-8 pb-4 text-center">
        <h1 className="text-2xl font-bold">Pay with Warpcast</h1>
      </div>

      {/* Main Content - Centered Buttons */}
      <div className="flex flex-col items-center justify-center flex-grow w-full px-4 space-y-4">
        <Button
          onClick={() => goToStep(1)}
          className="w-full max-w-xs bg-white text-black hover:bg-gray-200"
        >
          <span className="text-black">Receive</span>
        </Button>
        <Button
          onClick={() => goToStep(2)}
          className="w-full max-w-xs bg-white text-black hover:bg-gray-200"
        >
          <span className="text-black">Pay</span>
        </Button>
      </div>

      {/* Footer with Question Mark */}
      <div className="w-full pb-8 pt-4 flex justify-center">
        <button
          onClick={() => goToStep(4)}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold"
        >
          ?
        </button>
      </div>
    </div>
  );
}
