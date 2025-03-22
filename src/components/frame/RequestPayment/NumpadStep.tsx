import { memo, useCallback, useMemo } from "react";
import BackButton from "~/components/BackButton";
import { useNavigation } from "~/providers/NavigationContext";
import Numpad from "./Numpad";

type NumpadStepProps = {
  navigateToDetailsStep: () => void;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
};

const NumpadStep = memo(
  ({ navigateToDetailsStep, amount, setAmount }: NumpadStepProps) => {
    const onNumpadPress = useCallback((value: string) => {
      setAmount((prev: string) => {
        // Handle decimal point
        if (value === ".") {
          if (prev.includes(".")) return prev; // Don't add another decimal
          return prev === "0" ? "0." : prev + ".";
        }

        // Handle delete
        if (value === "delete") {
          if (prev.length <= 1) return "0";
          return prev.slice(0, -1);
        }

        // Handle number input
        if (prev === "0") return value;

        // Limit to 2 decimal places
        const parts = prev.split(".");
        if (parts.length > 1 && parts[1].length >= 2) {
          return prev;
        }

        return prev + value;
      });
    }, []);

    const { navigateTo } = useNavigation();
    const handleBack = useCallback(() => {
      navigateTo("Home");
    }, []);

    const handleNext = useCallback(() => {
      navigateToDetailsStep();
    }, []);

    const nextDisabled = useMemo(() => {
      return (
        amount === "" ||
        amount === "0" ||
        amount === "0." ||
        amount === "0.0" ||
        amount === "0.00"
      );
    }, [amount]);

    return (
      <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white px-4">
        <div className="w-full mt-8 relative  text-center flex items-center justify-center">
          <BackButton onClick={handleBack} />
          <h1 className="text-2xl font-bold">Enter Amount</h1>
        </div>

        <div className="flex-1  w-full flex flex-col items-center justify-between my-8">
          <div className="flex flex-col  w-full text-center items-center justify-center flex-1">
            <p className=" text-7xl font-bold">${amount}</p>
          </div>

          <Numpad onNumpadPress={onNumpadPress} />
        </div>

        <div className="w-full">
          <button
            onClick={handleNext}
            className="w-full bg-white text-black py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={nextDisabled}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
);

export default NumpadStep;
