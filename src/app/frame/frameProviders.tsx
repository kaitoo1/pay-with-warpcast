"use client";

import { FrameSDKProvider } from "~/providers/FrameSDKContext";
import SafeAreaWrapper from "~/components/SafeAreaWrapper";
import WagmiProvider from "~/providers/WagmiProvider";

export function FrameProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <SafeAreaWrapper>
        <FrameSDKProvider>{children}</FrameSDKProvider>
      </SafeAreaWrapper>
    </WagmiProvider>
  );
}
