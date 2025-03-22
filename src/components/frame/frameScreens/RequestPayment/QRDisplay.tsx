import { memo, useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import BackButton from "~/components/BackButton";
import { formatDisplayAmount } from "./RequestPayment";

type QRDisplayProps = {
  handleCloseQR: () => void;
  receivingAddress: string;
  amount: string;
  merchantName: string;
};

const QRDisplay = memo(
  ({
    handleCloseQR,
    receivingAddress,
    amount,
    merchantName,
  }: QRDisplayProps) => {
    const [copyButtonText, setCopyButtonText] = useState("Copy URL");
    const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

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

    return (
      <div className="flex flex-1 flex-col items-center space-y-6 ">
        <div className="w-full mt-8 px-4 text-center flex items-center justify-center">
          <BackButton onClick={handleCloseQR} />
          <h1 className="text-2xl font-bold">Scan</h1>
        </div>
        <p>Ask your customer to scan the code to pay.</p>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-6 bg-white rounded-lg">
            <QRCode value={generateQRUrl()} size={240} />
          </div>
          <p className="text-xs break-all mt-2 text-gray-400">
            {receivingAddress}
          </p>
        </div>
        <div className="text-center space-y-2 mt-4">
          <p className="text-6xl font-bold">{formatDisplayAmount(amount)}</p>
          <p className="text-2xl">{merchantName}</p>
        </div>
        <button
          onClick={handleCopyUrl}
          className="mt-4 bg-transparent border border-white text-white py-1 px-4 rounded-full text-sm  transition-colors duration-300"
        >
          {copyButtonText}
        </button>
      </div>
    );
  }
);

export default QRDisplay;
