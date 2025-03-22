"use client";

import React from "react";

interface AppContentProps {
  children: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> = ({ children }) => {
  return children;
};

export default AppContent;
