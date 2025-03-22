"use client";

import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "~/providers/WizardContext";

import {
  steps,
  TOTAL_STEPS,
} from "~/components/frame/frameScreens/wizard-steps";

// Only import SplashScreen eagerly since it's the first step
import BackButton from "~/components/BackButton";

const transition = {
  x: { type: "tween", duration: 0.2, ease: "easeInOut" },
  opacity: { duration: 0.15 },
} as const;

export default function WizardPage() {
  const { currentStep, direction, goPrevious } = useWizard();

  const variants = useMemo(
    () => ({
      enter: (direction: "forward" | "backward") => ({
        x: direction === "forward" ? 20 : -20,
        opacity: 0,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: (direction: "forward" | "backward") => ({
        zIndex: 0,
        x: direction === "forward" ? -20 : 20,
        opacity: 0,
      }),
    }),
    []
  );

  const nextStep =
    currentStep + 1 < TOTAL_STEPS ? steps[currentStep + 1] : null;

  if (currentStep < 0 || currentStep >= TOTAL_STEPS) {
    return <div>Unknown Step</div>;
  }

  return (
    <div className="relative h-screen">
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="h-screen w-full"
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>

      {/* Render the next step in the DOM so its contents are cached and ready to go */}
      {nextStep && <div className="hidden">{nextStep}</div>}
    </div>
  );
}
