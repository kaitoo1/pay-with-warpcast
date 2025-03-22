import React, { useCallback } from "react";
import BackButton from "~/components/BackButton";
import { useNavigation } from "~/providers/NavigationContext";

export default function About() {
  const { navigateTo } = useNavigation();
  const handleBack = useCallback(() => {
    navigateTo("Home");
  }, [navigateTo]);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
      <div className="w-full mt-8 px-4 text-center flex items-center justify-center">
        <BackButton onClick={handleBack} />
        <h1 className="text-2xl font-bold">About</h1>
      </div>

      <div className="flex-grow w-full px-6 py-4 overflow-y-auto">
        <div className="space-y-12 text-left mb-12">
          <p className="text-center">
            This app lets anyone receive or pay money easily using Warpcast.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold border-b border-gray-800 pb-2">
              Who it's for
            </h2>
            <p>Anyone looking to easily receive USDC without the hassle of:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Telling the payer how much to send</li>
              <li>Choosing the right chain</li>
              <li>Finding the right wallet app</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold border-b border-gray-800 pb-2">
              How it works
            </h2>
            <div className="space-y-2">
              <h3 className="font-medium font-semibold">To get paid:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Enter the amount you're asking for</li>
                <li>Generate a QR code</li>
                <li>Ask sender to scan (or click the link)</li>
                <li>They pay with their Warpcast frame</li>
                <li>Money goes straight to your wallet</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium font-semibold">To pay:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Scan the QR code with this app or your camera app</li>
                <li>Confirm the amount and hit Pay.</li>
                <li>Done!</li>
              </ol>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold border-b border-gray-800 pb-2">
              Contact
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For support or feedback, please contact @kaito on Farcaster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
