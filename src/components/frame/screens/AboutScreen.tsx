import React from "react";
import { useNavigation } from "~/providers/NavigationContext";
import RequestPayment from "~/components/frame/frameScreens/RequestPayment/RequestPayment";
import BackButton from "~/components/BackButton";
import SendPayment from "../frameScreens/SendPayment";
import About from "../frameScreens/About";

const AboutScreen: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <About />
      </div>
    </div>
  );
};

export default AboutScreen;
