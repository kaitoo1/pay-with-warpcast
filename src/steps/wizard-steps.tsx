import { ReactElement } from "react";
import { FullScreenLoader } from "~/components/FullScreenLoader";
import dynamic from "next/dynamic";

const StepOne = dynamic(() => import("~/steps/StepOne"), {
  loading: () => <FullScreenLoader />,
});

const StepTwo = dynamic(() => import("~/steps/StepTwo"), {
  loading: () => <FullScreenLoader />,
});

const StepThree = dynamic(() => import("~/steps/StepThree"), {
  loading: () => <FullScreenLoader />,
});

const StepFour = dynamic(() => import("~/steps/StepFour"), {
  loading: () => <FullScreenLoader />,
});

export const steps: ReactElement[] = [
  <StepOne key="step-one" />,
  <StepTwo key="step-two" />,
  <StepThree key="step-three" />,
  <StepFour key="step-four" />,
];

export const TOTAL_STEPS = steps.length;
