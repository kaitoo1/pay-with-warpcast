"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { TOTAL_STEPS } from "../steps/wizard-steps";

interface WizardContextValue {
  currentStep: number;
  goToStep: (stepIndex: number) => void;
  goNext: () => void;
  goPrevious: () => void;
  direction: "forward" | "backward";
}

const WizardContext = createContext<WizardContextValue | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const goToStep = useCallback(
    (stepIndex: number) => {
      setDirection(stepIndex > currentStep ? "forward" : "backward");
      if (stepIndex >= 0 && stepIndex < TOTAL_STEPS) {
        setCurrentStep(stepIndex);
      }
    },
    [currentStep]
  );

  const goNext = useCallback(() => {
    setDirection("forward");
    setCurrentStep((prev) => (prev < TOTAL_STEPS - 1 ? prev + 1 : prev));
  }, []);

  const goPrevious = useCallback(() => {
    setDirection("backward");
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const value: WizardContextValue = {
    currentStep,
    goToStep,
    goNext,
    goPrevious,
    direction,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
