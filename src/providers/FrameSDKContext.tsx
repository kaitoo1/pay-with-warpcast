import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import sdk, {
  FrameNotificationDetails,
  type Context,
} from "@farcaster/frame-sdk";
import { FullScreenLoader } from "~/components/FullScreenLoader";
import { SafeAreaWrapper } from "~/components/SafeAreaWrapper";
import { SignIn as SignInCore } from "@farcaster/frame-sdk";
import { generateNonce } from "~/lib/nonce";

interface FrameSDKContextType {
  context: Context.FrameContext | undefined;
  isLoaded: boolean;
  added: boolean;
  notificationDetails: FrameNotificationDetails | null;
  lastEvent: string;
  signInResult: SignInCore.SignInResult | null;
  signInError: Error | undefined;
  handleAddFrame: () => void;
}

const FrameSDKContext = createContext<FrameSDKContextType | undefined>(
  undefined
);

// Logic lifted from Demo.tsx in official repo: https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/components/Demo.tsx
export function FrameSDKProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [added, setAdded] = useState(false);
  const [notificationDetails, setNotificationDetails] =
    useState<FrameNotificationDetails | null>(null);
  const [lastEvent, setLastEvent] = useState("");
  const [signInResult, setSignInResult] =
    useState<SignInCore.SignInResult | null>(null);
  const [signInError, setSignInError] = useState<Error | undefined>();

  const getNonce = useCallback(async () => {
    const nonce = generateNonce();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const load = async () => {
      const context = await sdk.context;

      if (context) {
        setContext(context);
        setAdded(context.client.added);

        const nonce = await getNonce();

        try {
          const signInResult = await sdk.actions.signIn({ nonce });
          setSignInResult(signInResult);
        } catch (error) {
          setSignInError(error as Error);
        }
      }

      sdk.actions.ready({});
      setIsLoaded(true);

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setLastEvent(
          `frameAdded${!!notificationDetails ? ", notifications enabled" : ""}`
        );
        setAdded(true);
        if (notificationDetails) {
          setNotificationDetails(notificationDetails);
        }
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        setLastEvent(`frameAddRejected, reason ${reason}`);
      });

      sdk.on("frameRemoved", () => {
        setLastEvent("frameRemoved");
        setAdded(false);
        setNotificationDetails(null);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        setLastEvent("notificationsEnabled");
        setNotificationDetails(notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        setLastEvent("notificationsDisabled");
        setNotificationDetails(null);
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });
    };

    load();

    return () => {
      sdk.removeAllListeners();
    };
    // we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddFrame = useCallback(() => {
    if (context?.client.added) {
      return;
    }
    sdk.actions.addFrame();
  }, [context?.client.added]);

  const value = useMemo(
    () => ({
      context,
      isLoaded,
      added,
      notificationDetails,
      lastEvent,
      signInResult,
      signInError,
      handleAddFrame,
    }),
    [
      context,
      isLoaded,
      added,
      notificationDetails,
      lastEvent,
      signInResult,
      signInError,
      handleAddFrame,
    ]
  );

  if (!isLoaded) {
    return <FullScreenLoader />;
  }

  return (
    <FrameSDKContext.Provider value={value}>
      <SafeAreaWrapper>{children}</SafeAreaWrapper>
    </FrameSDKContext.Provider>
  );
}

export function useFrameSDK() {
  const context = useContext(FrameSDKContext);
  if (context === undefined) {
    throw new Error("useFrameSDK must be used within a FrameSDKProvider");
  }
  return context;
}
