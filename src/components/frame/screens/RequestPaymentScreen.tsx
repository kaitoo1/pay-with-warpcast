import React from "react";
import { useNavigation } from "~/providers/NavigationContext";
import RequestPayment from "~/components/frame/frameScreens/RequestPayment/RequestPayment";
import BackButton from "~/components/BackButton";

const RequestPaymentScreen: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <div className="flex flex-col h-screen px-4">
      <div className="flex-1">
        <RequestPayment />
      </div>
    </div>
  );
};

export default RequestPaymentScreen;
