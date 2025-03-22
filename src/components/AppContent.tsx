"use client";

import React from "react";
import { FrameSDKProvider } from "~/providers/FrameSDKContext";
// Import any other providers you need

interface AppContentProps {
  children: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> = ({ children }) => {
  return (
    <FrameSDKProvider>
      {/* Add any other providers here */}
      {children}
    </FrameSDKProvider>
  );
};

export default AppContent;
