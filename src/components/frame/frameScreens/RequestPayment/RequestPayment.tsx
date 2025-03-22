import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useFrameSDK } from "~/providers/FrameSDKContext";

import { useAccount } from "wagmi";
import BackButton from "~/components/BackButton";

import { isAddress } from "viem";
import QRDisplay from "./QRDisplay";
import { useNavigation } from "~/providers/NavigationContext";

// Update the format display function to include the dollar sign
export const formatDisplayAmount = (value: string) => {
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

const RequestPayment: FC = memo(() => {
  const { context } = useFrameSDK();
  const { address } = useAccount();
  // Get default merchant name from Farcaster username if available
  const defaultMerchantName = context?.user?.username || "";
  const [merchantName, setMerchantName] = useState(defaultMerchantName);
  const [amount, setAmount] = useState("0");
  const [receivingAddress, setReceivingAddress] = useState<string | undefined>(
    address
  );
  const [showQR, setShowQR] = useState(false);

  // Function to move cursor to the end of input
  const moveCursorToEnd = (e: React.FocusEvent<HTMLInputElement>) => {
    const valueLength = e.target.value.length;
    // Use setTimeout to ensure this happens after the default focus behavior
    setTimeout(() => {
      e.target.setSelectionRange(valueLength, valueLength);
    }, 0);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the address is a valid Ethereum address
    if (!receivingAddress || !isAddress(receivingAddress)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

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

  const { navigateTo } = useNavigation();
  const handleBack = useCallback(() => {
    navigateTo("Home");
  }, [navigateTo]);

  const handleAddressInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReceivingAddress(e.target.value);
    },
    []
  );

  const handleMerchantNameInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMerchantName(e.target.value);
    },
    []
  );

  const handleCloseQR = useCallback(() => {
    setShowQR(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white pb-16">
      {showQR ? (
        <QRDisplay
          handleCloseQR={handleCloseQR}
          receivingAddress={receivingAddress || ""}
          amount={amount}
          merchantName={merchantName}
        />
      ) : (
        <div className="flex flex-1 flex-col items-center space-y-6 ">
          <div className="w-full mt-8 px-4 text-center flex items-center justify-center">
            <BackButton onClick={handleBack} />
            <h1 className="text-2xl font-bold">Request</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1  justify-center w-full max-w-md space-y-6"
          >
            <div className="flex flex-col  flex-1 justify-center">
              <div className="flex justify-center items-center mb-12">
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={formatDisplayAmount(amount)}
                    onChange={(e) => {
                      // Strip any non-numeric characters except decimal point for the stored value
                      const rawValue = e.target.value.replace(/[^\d.]/g, "");
                      if (
                        rawValue === "" ||
                        /^\d+(\.\d{0,2})?$/.test(rawValue)
                      ) {
                        setAmount(rawValue === "" ? "0" : rawValue);
                      }
                    }}
                    onFocus={moveCursorToEnd}
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

              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2 items-center">
                  <label className="block text-sm font-bold text-white">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={merchantName}
                    onChange={handleMerchantNameInput}
                    placeholder="Enter merchant name"
                    className="bg-transparent border-2 border-gray-900  w-full p-3 bg-black text-center focus:border-white focus:outline-none text-white text-3xl placeholder-gray-500"
                    required
                  />
                </div>
                <div className="flex flex-col  items-center">
                  <label className="block text-sm font-bold text-white">
                    Receiving Address
                  </label>
                  <textarea
                    value={receivingAddress}
                    onChange={handleAddressInput}
                    placeholder="Enter a Base address"
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
              </div>
            </div>

            <button
              type="submit"
              disabled={!amount || !receivingAddress || !merchantName}
              className="w-full mt-8 bg-white border border-white text-black py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create QR Code
            </button>
          </form>
        </div>
      )}
    </div>
  );
});

RequestPayment.displayName = "RequestPayment";

export default RequestPayment;
