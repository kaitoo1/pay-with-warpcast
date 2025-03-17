import React from "react";
import { useWizard } from "~/providers/WizardContext";
import Button from "~/components/Button";

export default function About() {
  const { goToStep } = useWizard();

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
      <div className="w-full pt-8 pb-4 text-center">
        <h1 className="text-2xl font-bold">About</h1>
      </div>

      <div className="flex-grow w-full px-6 py-4 overflow-y-auto">
        <div className="space-y-6 text-left">
          <p className="text-center">
            This app lets you receive or pay money easily using Warpcast.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Who it's for</h2>
            <p>Anyone looking to easily receive USDC without the hassle of:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Telling the sender how much to send</li>
              <li>Choosing the right chain</li>
              <li>Finding the right wallet app</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">How to use it</h2>

            <div className="mb-3">
              <h3 className="font-medium">To get paid:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Enter the amount you're asking for</li>
                <li>Generate a QR code</li>
                <li>Have them scan (or click the link)</li>
                <li>They pay with their Warpcast frame</li>
                <li>Money goes straight to your wallet</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium">To pay:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Scan the QR code</li>
                <li>This app will open. Confirm the amount and hit Pay.</li>
                <li>Done! Fast and simple.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 pb-8">
        <Button
          onClick={() => goToStep(0)}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          <span className="text-black">Back to Home</span>
        </Button>
      </div>
    </div>
  );
}
