import React, { memo } from "react";
import { useNavigation } from "~/providers/NavigationContext";
import BackButton from "~/components/BackButton";
import SendPayment from "../frameScreens/SendPayment";

const SendPaymentScreen: React.FC = memo(() => {
  const { goBack } = useNavigation();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <SendPayment />
      </div>
    </div>
  );
});

export default SendPaymentScreen;
