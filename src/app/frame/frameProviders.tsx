"use client";

import { FrameSDKProvider } from "~/providers/FrameSDKContext";
import { WizardProvider } from "~/providers/WizardContext";
import SafeAreaWrapper from "~/components/SafeAreaWrapper";
import WagmiProvider from "~/providers/WagmiProvider";

export function FrameProviders({ children }: { children: React.ReactNode }) {
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
