import React, { memo, useCallback, useState } from "react";
import { useFrameSDK } from "~/providers/FrameSDKContext";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";

const RequestPayment: React.FC = memo(() => {
  const { context } = useFrameSDK();
  const [merchantName, setMerchantName] = useState("");
  const [amount, setAmount] = useState("0");
  const [receivingAddress, setReceivingAddress] = useState("");
  const [showQR, setShowQR] = useState(false);

  // Get default merchant name from Farcaster username if available
  const defaultMerchantName = context?.user?.username || "";

  // Set default merchant name when context is available
  React.useEffect(() => {
    if (defaultMerchantName && !merchantName) {
      setMerchantName(defaultMerchantName);
    }
  }, [defaultMerchantName, merchantName]);

  // Get wallet address from useAccount
  const { address } = useAccount();

  // Set receiving address when wallet address becomes available
  React.useEffect(() => {
    if (address && !receivingAddress) {
      setReceivingAddress(address);
    }
  }, [address, receivingAddress]);

  // Update the format display function to include the dollar sign
  const formatDisplayAmount = (value: string) => {
    // Remove leading zeros
    const cleanValue = value.replace(/^0+(?=\d)/, "");

    // If it's empty or just "0", return "$0"
    if (!cleanValue || cleanValue === "0") return "$0";

    // Split the number into integer and decimal parts
    const parts = cleanValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";

    // Add commas to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine integer and decimal parts with dollar sign
    return "$" + formattedInteger + decimalPart;
  };

  // Handle amount input to ensure it's valid (up to 2 decimal places)
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip any non-numeric characters except decimal point for the stored value
    const rawValue = e.target.value.replace(/[^\d.]/g, "");
    if (rawValue === "" || /^\d+(\.\d{0,2})?$/.test(rawValue)) {
      setAmount(rawValue === "" ? "0" : rawValue);
    }
  };

  // Function to move cursor to the end of input
  const moveCursorToEnd = (e: React.FocusEvent<HTMLInputElement>) => {
    const valueLength = e.target.value.length;
    // Use setTimeout to ensure this happens after the default focus behavior
    setTimeout(() => {
      e.target.setSelectionRange(valueLength, valueLength);
    }, 0);
  };

  // Generate QR code URL with parameters
  const generateQRUrl = useCallback(() => {
    const baseUrl =
      "https://www.warpcast.com/~/frames/launch?domain=https://61e2534fbf97.ngrok.app";
    const params = new URLSearchParams();

    if (merchantName) params.append("merchant", merchantName);
    if (amount) params.append("amount", amount);
    if (receivingAddress) params.append("address", receivingAddress);

    return `${baseUrl}&${params.toString()}`;
  }, [amount, merchantName, receivingAddress]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure we're using the raw numeric amount value (without $ and commas)
    // This is already handled correctly since our state stores the raw value

    if (amount && amount !== "0" && receivingAddress && merchantName) {
      setShowQR(true);
    } else {
      // Show an error or alert if amount is 0
      if (amount === "0") {
        alert("Please enter an amount greater than 0");
      }
    }
  };

  return (
    <div className="bg-black flex flex-col items-center justify-center p-4 text-white min-h-screen">
      {!showQR ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Request</h2>

          <div className="flex justify-center items-center mb-12">
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={formatDisplayAmount(amount)}
                onChange={(e) => {
                  // Strip any non-numeric characters except decimal point for the stored value
                  const rawValue = e.target.value.replace(/[^\d.]/g, "");
                  if (rawValue === "" || /^\d+(\.\d{0,2})?$/.test(rawValue)) {
                    setAmount(rawValue === "" ? "0" : rawValue);
                  }
                }}
                onFocus={moveCursorToEnd}
                onClick={moveCursorToEnd}
                className="bg-transparent border-2 border-gray-900 text-center w-full  focus:outline-none text-white text-7xl appearance-none"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                  caretColor: "transparent",
                }}
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2 items-center">
            <label className="block text-sm font-bold text-white">
              Display Name
            </label>
            <input
              type="text"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              placeholder="Enter merchant name"
              className="bg-transparent border-2 border-gray-900  w-full p-3 bg-black text-center focus:border-white focus:outline-none text-white text-3xl placeholder-gray-500"
              required
            />
            {!merchantName && !defaultMerchantName && (
              <p className="text-xs text-yellow-500">
                Waiting for profile information...
              </p>
            )}
          </div>

          <div className="flex flex-col  items-center">
            <label className="block text-sm font-bold text-white ">
              Receiving Address
            </label>
            <textarea
              value={receivingAddress}
              onChange={(e) => setReceivingAddress(e.target.value)}
              placeholder="0x..."
              className="bg-transparent border-2 border-gray-900  rounded-lg  w-full p-3 bg-black focus:border-white focus:outline-none text-white placeholder-gray-500 resize-none"
              style={{
                overflow: "hidden",
                wordBreak: "break-all",
                height: "auto",
              }}
              rows={2}
              required
            />
            {!receivingAddress && address === undefined && (
              <p className="text-xs text-yellow-500">
                Waiting for wallet connection...
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!amount || !receivingAddress || !merchantName}
            className="w-full mt-8 bg-white border border-white text-black py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create QR Code
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          {/* <h2 className="text-2xl font-bold">Scan to pay</h2> */}
          <p>Ask your customer to scan the code to pay.</p>
          <div className="p-6 bg-white rounded-lg">
            <QRCode value={generateQRUrl()} size={240} />
          </div>
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold">{formatDisplayAmount(amount)}</p>
            <p className="text-xl">{merchantName}</p>
            <p className="text-xs break-all mt-2 text-gray-400">
              {receivingAddress}
            </p>
          </div>
          <button
            onClick={() => setShowQR(false)}
            className="mt-4 bg-transparent border border-white text-white py-2 px-6 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
});

RequestPayment.displayName = "RequestPayment";

export default RequestPayment;
