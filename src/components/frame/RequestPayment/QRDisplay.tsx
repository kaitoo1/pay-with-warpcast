import { memo, useCallback, useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import BackButton from "~/components/BackButton";
import CloseIcon from "~/components/icons/CloseIcon";
import { useNavigation } from "~/providers/NavigationContext";
import { formatDisplayAmount } from "~/utils/formatters";

type QRDisplayProps = {
  navigateToDetailsStep: () => void;
  receivingAddress: string;
  amount: string;
  merchantName: string;
};

const QRDisplay = memo(
  ({
    navigateToDetailsStep,
    receivingAddress,
    amount,
    merchantName,
  }: QRDisplayProps) => {
    const [copyButtonText, setCopyButtonText] = useState("Copy URL");
    const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

    // Generate QR code URL with parameters
    const qrUrl = useMemo(() => {
      const baseUrl =
        "https://www.warpcast.com/~/frames/launch?domain=https://61e2534fbf97.ngrok.app";
      const params = new URLSearchParams();

      if (merchantName) params.append("merchantName", merchantName);
      if (amount) params.append("amount", amount);
      if (receivingAddress) params.append("address", receivingAddress);

      return `${baseUrl}&${params.toString()}`;
    }, [amount, merchantName, receivingAddress]);

    const handleCopyUrl = useCallback(() => {
      const url = qrUrl;
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
    }, [qrUrl]);

    const { navigateTo } = useNavigation();

    const handleClose = useCallback(() => {
      navigateTo("Home");
    }, [navigateTo]);

    return (
      <div className="flex flex-1 flex-col items-center justify-between space-y-6 w-full h-full px-4">
        <div className="w-full relative mt-8  text-center flex items-center justify-center">
          <BackButton onClick={navigateToDetailsStep} />
          <h1 className="text-2xl font-bold">Scan</h1>
          <button
            onClick={handleClose}
            className="absolute right-0 p-1 top-[4px]"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p>Ask your customer to scan the code to pay.</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-6 bg-white rounded-lg">
              <QRCode value={qrUrl} size={240} />
            </div>
            <p className="text-xs break-all mt-2 text-gray-400">
              {receivingAddress}
            </p>
          </div>
          <div className="text-center space-y-2 mt-4">
            <p className="text-6xl font-bold">${formatDisplayAmount(amount)}</p>
            <p className="text-2xl">{merchantName}</p>
          </div>
        </div>
        <div className="flex w-full ">
          <button
            onClick={handleCopyUrl}
            className="flex flex-1 text-center items-center justify-center bg-transparent border border-white w-full text-white py-3 rounded-lg font-medium transition-colors duration-300"
          >
            {copyButtonText}
          </button>
        </div>
      </div>
    );
  }
);

export default QRDisplay;
