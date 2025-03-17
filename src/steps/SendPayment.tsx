import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useWizard } from "~/providers/WizardContext";
import { useSearchParams } from "next/navigation";
import SendPaymentForm from "~/components/payment/SendPaymentForm";
import PaymentComplete from "~/components/payment/PaymentComplete";
import QRCodeScanner from "~/components/payment/QRCodeScanner";
import { encodeFunctionData, parseUnits } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { USDC_CONTRACT_ABI, USDC_CONTRACT_ADDRESS } from "~/lib/contract";
import Button from "~/components/Button";
import FarcasterIcon from "~/components/icons/FarcasterIcon";
import sdk from "@farcaster/frame-sdk";

export default function SendPayment() {
  const { goToStep } = useWizard();
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
      enabled: !!transactionHash,
    });

  useEffect(() => {
    // Get payment details from URL params
    const amountParam = searchParams.get("amount");
    const addressParam = searchParams.get("address");

    if (amountParam && addressParam) {
      setAmount(amountParam);
      setReceivingAddress(addressParam);
      setView("form");
    }
  }, [searchParams]);

  useEffect(() => {
    if (isConfirmed) {
      setView("complete");
    }
  }, [isConfirmed]);

  const handleValidQRCode = (amount: string, address: string) => {
    setAmount(amount);
    setReceivingAddress(address);
    setView("form");
  };

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

  const handleGoHome = () => {
    goToStep("Home");
  };

  const handleCancel = () => {
    // Reset state and go back to scanner
    setAmount("");
    setReceivingAddress("");
    setError(null);
    setView("scanner");
  };

  // Derive button text based on transaction state
  const buttonText = useMemo(() => {
    if (isSendTxPending) return "Sending...";
    if (isConfirming) return "Confirming...";
    if (isConfirmed) return "Confirmed!";
    if (isProcessing) return "Processing...";
    return "Send Payment";
  }, [isSendTxPending, isConfirming, isConfirmed, isProcessing]);

  // Render the appropriate component based on view state
  switch (view) {
    case "complete":
      return (
        <PaymentComplete
          amount={amount}
          receivingAddress={receivingAddress}
          transactionHash={transactionHash}
          onGoHome={handleGoHome}
        />
      );

    case "form":
      return (
        <SendPaymentForm
          amount={amount}
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
}

function PayButton() {
  const searchParams = useSearchParams();
  const recipientAddress = searchParams.get("recipientAddress");
  const amount = searchParams.get("amount");

  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();
  const [txHash, setTxHash] = useState<string | null>(null);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  const { goNext } = useWizard();

  useEffect(() => {
    if (isConfirmed) {
      goNext();
    }
  }, [goNext, isConfirmed]);

  const handleTransfer = useCallback(() => {
    if (!recipientAddress) return;
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error("Invalid amount");
      return;
    }

    try {
      sendTransaction(
        {
          to: USDC_CONTRACT_ADDRESS,
          data: encodeFunctionData({
            abi: USDC_CONTRACT_ABI,
            functionName: "transfer",
            args: [recipientAddress.trim(), parseUnits(amount, 6)],
          }),
          value: 0n,
        },
        {
          onSuccess: (hash) => {
            setTxHash(hash);
          },
        }
      );
    } catch (e) {
      console.error("Error preparing USDC transfer:", e);
    }
  }, [sendTransaction, recipientAddress, amount]);

  const error = useMemo(() => {
    if (!recipientAddress) return "Recipient address is required";
    if (isNaN(Number(amount)) || Number(amount) <= 0) return "Invalid amount";
    if (isSendTxError) return sendTxError.message;
  }, [isSendTxError, sendTxError, recipientAddress, amount]);

  const text = useMemo(() => {
    if (isSendTxPending) return "Sending...";
    if (isConfirming) return "Confirming...";
    if (isConfirmed) return "Confirmed!";
    return `Pay`;
  }, [isSendTxPending, isConfirming, isConfirmed]);

  return (
    <>
      <Button
        onClick={handleTransfer}
        disabled={!recipientAddress || isSendTxPending || isConfirming}
      >
        {text}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

function ShareButton() {
  const handleShare = useHandleShareOnFarcaster();
  return (
    <Button onClick={handleShare}>
      <div className="flex items-center justify-center gap-2">
        <FarcasterIcon className="w-5 h-5" />
        <span>Share</span>
      </div>
    </Button>
  );
}

function useHandleShareOnFarcaster() {
  return useCallback(() => {
    const PERSONALITY_PLACEHOLDER = "${personality}" as const;

    const CLEVER_MESSAGES = [
      `My aura results are in. I am a shiny ${PERSONALITY_PLACEHOLDER}.`,
      `Google's latest iteration of their quantum computer claims my aura is ${PERSONALITY_PLACEHOLDER}.`,
      `My aura reading is a rock solid ${PERSONALITY_PLACEHOLDER}. Backed by cold hard science.`,
      `I'm ${PERSONALITY_PLACEHOLDER} no cap fr fr. How do you do, fellow kids?`,
      `Just tried the hot new aura frame. It says I'm a ${PERSONALITY_PLACEHOLDER}.`,
      `According to my 110% scientifically proven aura reading, I'm a ${PERSONALITY_PLACEHOLDER}. Sounds about right!`,
      `My aura test came back ${PERSONALITY_PLACEHOLDER}. Time to pivot to Solana.`,
      `Apparently, I'm ${PERSONALITY_PLACEHOLDER} according to my aura. Updating my LinkedIn rn.`,
      `Looked into a crystal ball to learn that I'm a ${PERSONALITY_PLACEHOLDER}. Wow.`,
      `My aura's giving off ${PERSONALITY_PLACEHOLDER} vibes. Are you not entertained?`,
      `Ran my soul through an algorithm. It spat out ${PERSONALITY_PLACEHOLDER}. Is this the future?`,
      `My aura is a Grade A, certified organic, ethical, farm-raised ${PERSONALITY_PLACEHOLDER}.`,
      `A psychic AI pegged me as ${PERSONALITY_PLACEHOLDER}. I didn't ask, they just knew.`,
      `My aura's screaming ${PERSONALITY_PLACEHOLDER}. Probably why my plants keep dying.`,
      `My vibe check results? ${PERSONALITY_PLACEHOLDER}. No wonder I'm exhausted.`,
      `The coolest aura app I've ever used rated me ${PERSONALITY_PLACEHOLDER}. Five stars, no notes.`,
      `A glitchy aura fax machine says I'm ${PERSONALITY_PLACEHOLDER}. It crashed right after?!`,
      `My horoscope and aura had a meeting. Outcome: ${PERSONALITY_PLACEHOLDER}. Send help.`,
      `My aura's broadcasting ${PERSONALITY_PLACEHOLDER} in neon lights. Can't turn it off.`,
      `A rogue scientist DM'd me: 'Your aura's ${PERSONALITY_PLACEHOLDER}.' Immediately blocked.`,
      `Apparently, my aura is ${PERSONALITY_PLACEHOLDER}. Not sure what it means, but it sounds fancy.`,
      `Breaking news: my aura is ${PERSONALITY_PLACEHOLDER}. More updates as this story develops.`,
      `I just unlocked my lifetime achievement: ${PERSONALITY_PLACEHOLDER}. I will not be taking any questions at this time.`,
      `Plot twist: My aura is ${PERSONALITY_PLACEHOLDER}. This app glazing me fr.`,
      `I just consulted the aura oracle. Verdict: ${PERSONALITY_PLACEHOLDER}.`,
      `My aura just confirmed I'm ${PERSONALITY_PLACEHOLDER}. I always knew I was special.`,
      `My aura is ${PERSONALITY_PLACEHOLDER}. This actually lines up perfectly with my birthday.`,
      `I took an aura test and it said ${PERSONALITY_PLACEHOLDER}. Should I be concerned?`,
    ];

    const COLORS = [
      "RUBY",
      "ROSEQUARTZ",
      "CORAL",
      "COPPER",
      "CLEMENTINE",
      "TOPAZ",
      "JADE",
      "SAGE",
      "AQUAMARINE",
      "TEAL",
      "MOONSTONE",
      "SAPPHIRE",
      "MIDNIGHT",
      "PERIWINKLE",
      "AMETHYST",
      "LILAC",
    ];

    // Get a random message template from CLEVER_MESSAGES
    const randomMessage =
      CLEVER_MESSAGES[Math.floor(Math.random() * CLEVER_MESSAGES.length)];

    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    // Replace the placeholder with actual personality result
    const message = randomMessage.replaceAll(
      PERSONALITY_PLACEHOLDER,
      String(randomColor.toUpperCase() || "mysterious being")
    );

    const sampleImage =
      "https://storage.googleapis.com/moshi-images/images/50e6bf1364590cf3ac926b3fef13d45bc226e918f2795a35.png";

    const linkUrl = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/share-frame/${encodeURIComponent(sampleImage)}?auraType=${randomColor}`;
    console.log({ linkUrl });

    sdk.actions.openUrl(
      `https://warpcast.com/~/compose?text=${encodeURIComponent(
        message
      )}&embeds[]=${encodeURIComponent(linkUrl)}`
    );
  }, []);
}
