import React, { useCallback, useMemo, useState } from "react";
import { useWizard } from "~/providers/WizardContext";
import Button from "~/components/Button";
import FarcasterIcon from "~/components/icons/FarcasterIcon";
import sdk from "@farcaster/frame-sdk";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

export default function StepFour() {
  const { goToStep } = useWizard();

  const handleReturnToStart = () => {
    goToStep(0); // Go back to the first step (index 0)
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex flex-col items-center mt-8 px-4">
        <h1 className="text-[24px] font-bold mb-4 text-gray-900">Step 4</h1>
        <p className="text-[16px] mb-6 text-center text-gray-800">
          Pour-over shabby chic cornhole, food truck tote bag organic blue
          bottle raw denim typewriter 3 wolf moon bodega boys listicle irony.
          Scenester gorpcore lumbersexual pinterest, hot chicken slow-carb
          chicharrones. Snackwave fanny pack polaroid direct trade post-ironic
          bushwick bitters microdosing slow-carb irony banjo hashtag hoodie.
          PBR&B twee hammock chicharrones shoreditch, chia wolf crucifix
          franzen. Schlitz marfa stumptown gorpcore, 3 wolf moon readymade banjo
          shaman ennui iPhone gastropub sustainable bitters DSA. Marfa you
          probably haven&apos;t heard of them yr, ethical intelligentsia
          coloring book blog.
        </p>
      </div>

      <div className="w-full max-w-md px-4 mb-6 flex flex-col gap-4">
        <MintButton />
        <ShareButton />
        <Button onClick={handleReturnToStart}>Return to Beginning</Button>
      </div>
    </div>
  );
}

function MintButton() {
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

  const handleMint = useCallback(() => {
    sendTransaction(
      {
        // call yoink() on Yoink contract
        to: "0x4bBFD120d9f352A0BEd7a014bd67913a2007a878",
        data: "0x9846cd9efc000023c0",
      },
      {
        onSuccess: (hash) => {
          setTxHash(hash);
        },
      }
    );
  }, [sendTransaction]);

  const error = useMemo(() => {
    if (isSendTxError) return sendTxError.message;
  }, [isSendTxError, sendTxError]);

  const text = useMemo(() => {
    if (isSendTxPending) return "Sending...";
    if (isConfirming) return "Confirming...";
    if (isConfirmed) return "Confirmed!";
    return "Send Transaction";
  }, [isSendTxPending, isConfirming, isConfirmed]);

  return (
    <>
      <Button onClick={handleMint} disabled={isSendTxPending || isConfirming}>
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
