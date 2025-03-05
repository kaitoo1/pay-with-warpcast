"use client";

import dynamic from "next/dynamic";
import { FrameSDKProvider } from "~/providers/FrameSDKContext";
import { WizardProvider } from "~/providers/WizardContext";
import { SafeAreaWrapper } from "~/components/SafeAreaWrapper";

const WagmiProvider = dynamic(() => import("~/providers/WagmiProvider"), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <SafeAreaWrapper>
        <FrameSDKProvider>
          <WizardProvider>{children}</WizardProvider>
        </FrameSDKProvider>
      </SafeAreaWrapper>
    </WagmiProvider>
  );
}
