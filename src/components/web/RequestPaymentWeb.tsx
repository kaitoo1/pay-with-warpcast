import React, { FC, memo, useCallback, useState, useMemo } from "react";
import QRCode from "react-qr-code";
import { isAddress } from "viem";

const RequestPaymentWeb: FC = memo(() => {
  const [merchantName, setMerchantName] = useState("The Krusty Krab");
  const [amount, setAmount] = useState("0");
  const [receivingAddress, setReceivingAddress] = useState(
    "0xA021F1E4C867fD9eE01e94F16Fc67E7e59099b0E"
  );
  const [showQR, setShowQR] = useState(false);

  // Update the format display function to include the dollar sign
  const formatDisplayAmount = useCallback((value: string) => {
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
  }, []);

  // Function to move cursor to the end of input
  const moveCursorToEnd = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const valueLength = e.target.value.length;
      // Use setTimeout to ensure this happens after the default focus behavior
      setTimeout(() => {
        e.target.setSelectionRange(valueLength, valueLength);
      }, 0);
    },
    []
  );

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

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Check if the address is a valid Ethereum address
      if (!isAddress(receivingAddress)) {
        alert("Please enter a valid Ethereum address");
        return;
      }

      if (amount && amount !== "0" && receivingAddress && merchantName) {
        setShowQR(true);
      } else {
        // Show an error or alert if amount is 0
        if (amount === "0") {
          alert("Please enter an amount greater than 0");
        }
      }
    },
    [amount, merchantName, receivingAddress]
  );

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Strip any non-numeric characters except decimal point for the stored value
      const rawValue = e.target.value.replace(/[^\d.]/g, "");
      if (rawValue === "" || /^\d+(\.\d{0,2})?$/.test(rawValue)) {
        setAmount(rawValue === "" ? "0" : rawValue);
      }
    },
    []
  );

  const handleBack = useCallback(() => {
    setShowQR(false);
  }, []);

  const isFormValid = useMemo(() => {
    return (
      amount !== "0" &&
      merchantName.trim() !== "" &&
      isAddress(receivingAddress)
    );
  }, [amount, merchantName, receivingAddress]);

  const qrCodeElement = useMemo(() => {
    return <QRCode value={generateQRUrl()} size={320} />;
  }, [generateQRUrl]);

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
                onChange={handleAmountChange}
                onFocus={moveCursorToEnd}
                className="bg-transparent border-2 border-gray-900 text-center w-full  focus:outline-none text-white text-7xl appearance-none"
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
          </div>

          <div className="flex flex-col  items-center">
            <label className="block text-sm font-bold text-white ">
              Receiving Address
            </label>
            <textarea
              value={receivingAddress}
              onChange={(e) => setReceivingAddress(e.target.value)}
              placeholder="Ethereum address on Base"
              className="bg-transparent border-2 border-gray-900  rounded-lg  w-full p-3 bg-black focus:border-white focus:outline-none text-white placeholder-gray-500 resize-none"
              style={{
                overflow: "hidden",
                wordBreak: "break-all",
                height: "auto",
              }}
              rows={2}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full mt-8 bg-white border border-white text-black py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create QR Code
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <p>Ask your customer to scan the code to pay.</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-6 bg-white rounded-lg">{qrCodeElement}</div>
            <p className="text-xs break-all mt-2 text-gray-400">
              {receivingAddress}
            </p>
          </div>
          <div className="text-center space-y-2 mt-4">
            <p className="text-6xl font-bold">{formatDisplayAmount(amount)}</p>
            <p className="text-2xl">{merchantName}</p>
          </div>
          <button
            onClick={handleBack}
            className="mt-12 bg-transparent border border-white text-white py-2 px-6 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
});

RequestPaymentWeb.displayName = "RequestPaymentWeb";

export default RequestPaymentWeb;
