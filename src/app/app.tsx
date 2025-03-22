"use client";

import dynamic from "next/dynamic";
import { AppProps } from "next/app";

// Use dynamic import to avoid SSR issues with components that need browser APIs
const AppContent = dynamic(() => import("~/components/AppContent"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContent>
      <Component {...pageProps} />
    </AppContent>
  );
}
