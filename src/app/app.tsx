"use client";

import dynamic from "next/dynamic";

const Wizard = dynamic(() => import("../steps/WizardEntrypoint"), {
  ssr: false,
});

export default function App() {
  return <Wizard />;
}
