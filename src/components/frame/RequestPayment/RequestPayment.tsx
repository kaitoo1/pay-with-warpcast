import React, { memo, useCallback, useState, useEffect } from "react";
import { useFrameSDK } from "~/providers/FrameSDKContext";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import BackButton from "~/components/BackButton";

import { isAddress } from "viem";
import { useNavigation } from "~/providers/NavigationContext";
import NumpadStep from "./NumpadStep";
import { formatDisplayAmount } from "~/utils/formatters";
import ConfirmDetailsStep from "./ConfirmDetailsStep";
import QRDisplay from "./QRDisplay";

type Step = "amount" | "details" | "qrcode";

const RequestPayment: React.FC = memo(() => {
  const { context } = useFrameSDK();
  const { address } = useAccount();

  // Get default merchant name from Farcaster username if available
  const defaultMerchantName = context?.user?.username || "";

  // State
  const [merchantName, setMerchantName] = useState(defaultMerchantName);
  const [amount, setAmount] = useState("0");
  const [receivingAddress, setReceivingAddress] = useState<string | undefined>(
    address
  );
  const [copyButtonText, setCopyButtonText] = useState("Copy URL");
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("amount");
  const [error, setError] = useState<string | null>(null);

  // Reset copy button text when QR code is hidden
  useEffect(() => {
    if (currentStep !== "qrcode") {
      setCopyButtonText("Copy URL");
      if (copyTimeout) {
        clearTimeout(copyTimeout);
        setCopyTimeout(null);
      }
    }
  }, [currentStep, copyTimeout]);

  // Generate QR code URL with parameters
  const generateQRUrl = useCallback(() => {
    const baseUrl =
      "https://www.warpcast.com/~/frames/launch?domain=https://61e2534fbf97.ngrok.app";
    const params = new URLSearchParams();

    if (merchantName) params.append("merchantName", merchantName);
    if (amount) params.append("amount", amount);
    if (receivingAddress) params.append("address", receivingAddress);

    return `${baseUrl}&${params.toString()}`;
  }, [amount, merchantName, receivingAddress]);

  // Handle navigation between steps
  const handleNext = useCallback(() => {
    setError(null);

    if (currentStep === "amount") {
      if (amount === "0") {
        setError("Please enter an amount greater than 0");
        return;
      }
      setCurrentStep("details");
    } else if (currentStep === "details") {
      if (!merchantName.trim()) {
        setError("Please enter a display name");
        return;
      }

      if (!receivingAddress) {
        setError("Please enter a receiving address");
        return;
      }

      if (!isAddress(receivingAddress)) {
        setError("Please enter a valid Ethereum address");
        return;
      }

      setCurrentStep("qrcode");
    }
  }, [currentStep, amount, merchantName, receivingAddress]);

  const { navigateTo } = useNavigation();
  const handleBack = useCallback(() => {
    if (currentStep === "amount") {
      navigateTo("Home");
    } else if (currentStep === "details") {
      setCurrentStep("amount");
    } else if (currentStep === "qrcode") {
      setCurrentStep("details");
    }
  }, [currentStep, navigateTo]);

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

  const handleCopyUrl = useCallback(() => {
    const url = generateQRUrl();
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyButtonText("Copied!");
        // Reset button text after 2 seconds
        const timeout = setTimeout(() => {
          setCopyButtonText("Copy URL");
        }, 2000);
        setCopyTimeout(timeout);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        setCopyButtonText("Failed to copy");
      });
  }, [generateQRUrl]);

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
