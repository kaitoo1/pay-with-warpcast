import React, { FC, Suspense } from "react";
import { useNavigation } from "~/providers/NavigationContext";
import FullScreenLoader from "~/components/FullScreenLoader";

import RequestPaymentScreen from "./screens/RequestPaymentScreen";
import SendPaymentScreen from "./screens/SendPaymentScreen";
import AboutScreen from "./screens/AboutScreen";
import HomeScreen from "./screens/HomeScreen";

const ScreenManager: FC = () => {
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
