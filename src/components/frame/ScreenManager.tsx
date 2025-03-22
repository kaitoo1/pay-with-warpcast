import React, { lazy, Suspense } from "react";
import { useNavigation, ScreenType } from "~/providers/NavigationContext";
import FullScreenLoader from "~/components/FullScreenLoader";

// Import screens

import RequestPaymentScreen from "./screens/RequestPaymentScreen";
import SendPaymentScreen from "./screens/SendPaymentScreen";
import AboutScreen from "./screens/AboutScreen";
import HomeScreen from "./screens/HomeScreen";

const ScreenManager: React.FC = () => {
  const { currentScreen } = useNavigation();

  // Render the appropriate screen based on the current navigation state
  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return <HomeScreen />;
      case "RequestPayment":
        return (
          <Suspense fallback={<FullScreenLoader />}>
            <RequestPaymentScreen />
          </Suspense>
        );
      case "SendPayment":
        return (
          <Suspense fallback={<FullScreenLoader />}>
            <SendPaymentScreen />
          </Suspense>
        );
      case "About":
        return (
          <Suspense fallback={<FullScreenLoader />}>
            <AboutScreen />
          </Suspense>
        );
      default:
        return <HomeScreen />;
    }
  };

  return <div className="min-h-screen bg-black">{renderScreen()}</div>;
};

export default ScreenManager;
