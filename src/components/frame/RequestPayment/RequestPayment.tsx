import React, { memo, useCallback, useState } from "react";
import { useFrameSDK } from "~/providers/FrameSDKContext";
import { useAccount } from "wagmi";
import { isAddress } from "viem";

import NumpadStep from "./NumpadStep";
import ConfirmDetailsStep from "./ConfirmDetailsStep";
import QRDisplay from "./QRDisplay";

type Step = "amount" | "details" | "qrcode";

const RequestPayment: React.FC = memo(() => {
  const { context } = useFrameSDK();
  const { address } = useAccount();

  // Get default merchant name from Farcaster username if available
  const defaultMerchantName = context?.user?.username || "";

  const [merchantName, setMerchantName] = useState(defaultMerchantName);
  const [amount, setAmount] = useState("0");
  const [receivingAddress, setReceivingAddress] = useState<string | undefined>(
    address
  );

  const [currentStep, setCurrentStep] = useState<Step>("amount");

  const navigateToNumpadStep = useCallback(() => {
    setCurrentStep("amount");
  }, []);

  const navigateToDetailsStep = useCallback(() => {
    setCurrentStep("details");
  }, []);

  const navigateToQRCodeStep = useCallback(() => {
    if (!merchantName.trim()) {
      alert("Please enter a display name");
      return;
    }

    if (!receivingAddress) {
      alert("Please enter a receiving address");
      return;
    }

    if (!isAddress(receivingAddress)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    setCurrentStep("qrcode");
  }, [merchantName, receivingAddress]);

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "amount":
        return (
          <NumpadStep
            navigateToDetailsStep={navigateToDetailsStep}
            amount={amount}
            setAmount={setAmount}
          />
        );
      case "details":
        return (
          <ConfirmDetailsStep
            navigateToNumpadStep={navigateToNumpadStep}
            navigateToQRCodeStep={navigateToQRCodeStep}
            amount={amount}
            merchantName={merchantName}
            setMerchantName={setMerchantName}
            receivingAddress={receivingAddress || ""}
            setReceivingAddress={setReceivingAddress}
          />
        );
      case "qrcode":
        return (
          <QRDisplay
            navigateToDetailsStep={navigateToDetailsStep}
            receivingAddress={receivingAddress || ""}
            amount={amount}
            merchantName={merchantName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white pb-16">
      {renderCurrentStep()}
    </div>
  );
});

RequestPayment.displayName = "RequestPayment";

export default RequestPayment;
