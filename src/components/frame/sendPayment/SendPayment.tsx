import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  FC,
  memo,
} from "react";

import { useSearchParams } from "next/navigation";
import SendPaymentForm from "~/components/frame/SendPayment/SendPaymentForm";
import PaymentComplete from "~/components/frame/SendPayment/PaymentComplete";
import QRCodeScanner from "~/components/frame/SendPayment/QRCodeScanner";
import { encodeFunctionData, parseUnits } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { USDC_CONTRACT_ABI, USDC_CONTRACT_ADDRESS } from "~/lib/contract";
import { useNavigation } from "~/providers/NavigationContext";

const SendPayment: FC = memo(() => {
  const { navigateTo } = useNavigation();
  const searchParams = useSearchParams();

  // View state
  const [view, setView] = useState<"scanner" | "form" | "complete">("scanner");

  // Payment details from URL params or QR code
  const [amount, setAmount] = useState<string>("");
  const [receivingAddress, setReceivingAddress] = useState<string>("");

  // Payment state
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [merchantName, setMerchantName] = useState<string>("");

  // Transaction hooks
  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: transactionHash as `0x${string}`,
    });

  useEffect(() => {
    // Get payment details from URL params
    const amountParam = searchParams.get("amount");
    const addressParam = searchParams.get("address");
    const merchantNameParam = searchParams.get("merchantName");
    if (amountParam && addressParam) {
      setAmount(amountParam);
      setReceivingAddress(addressParam);
      setMerchantName(merchantNameParam || "");
      setView("form");
    }
  }, [searchParams]);

  useEffect(() => {
    if (isConfirmed) {
      setView("complete");
    }
  }, [isConfirmed]);

  const handleValidQRCode = useCallback(
    (amount: string, address: string, merchantName: string) => {
      setView("form");
      setAmount(amount);
      setReceivingAddress(address);
      setMerchantName(merchantName);
    },
    []
  );

  const handleSendPayment = useCallback(() => {
    if (!receivingAddress) return;
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Invalid amount");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      sendTransaction(
        {
          to: USDC_CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi: USDC_CONTRACT_ABI,
            functionName: "transfer",
            args: [receivingAddress.trim(), parseUnits(amount, 6)],
          }),
          value: 0n,
        },
        {
          onSuccess: (hash) => {
            setTransactionHash(hash);
            setIsProcessing(false);
          },
          onError: (error) => {
            setError(error.message || "Transaction failed");
            setIsProcessing(false);
          },
        }
      );
    } catch (e) {
      console.error("Error preparing USDC transfer:", e);
      setError("Error preparing transaction");
      setIsProcessing(false);
    }
  }, [sendTransaction, receivingAddress, amount]);

  // Derive error from various sources
  useEffect(() => {
    if (isSendTxError && sendTxError) {
      setError(sendTxError.message);
    }
  }, [isSendTxError, sendTxError]);

  const handleGoHome = useCallback(() => {
    navigateTo("Home");
  }, [navigateTo]);

  const handleCancel = useCallback(() => {
    // Reset state and go back to scanner
    setAmount("");
    setReceivingAddress("");
    setError(null);
    setView("scanner");
  }, []);

  // Derive button text based on transaction state
  const buttonText = useMemo(() => {
    if (isSendTxPending) return "Sending...";
    if (isConfirming) return "Confirming...";
    if (isConfirmed) return "Confirmed!";
    if (isProcessing) return "Processing...";
    return "Pay";
  }, [isSendTxPending, isConfirming, isConfirmed, isProcessing]);

  // Render the appropriate component based on view state
  switch (view) {
    case "complete":
      return (
        <PaymentComplete
          amount={amount}
          receivingAddress={receivingAddress}
          transactionHash={transactionHash}
          merchantName={merchantName}
          onGoHome={handleGoHome}
        />
      );

    case "form":
      return (
        <SendPaymentForm
          amount={amount}
          merchantName={merchantName}
          receivingAddress={receivingAddress}
          isProcessing={isProcessing || isSendTxPending || isConfirming}
          error={error}
          buttonText={buttonText}
          onSendPayment={handleSendPayment}
          onCancel={handleCancel}
        />
      );

    case "scanner":
    default:
      return <QRCodeScanner onValidQRCode={handleValidQRCode} />;
  }
});

export default SendPayment;
