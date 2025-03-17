import { ReactElement } from "react";
import { FullScreenLoader } from "~/components/FullScreenLoader";
import dynamic from "next/dynamic";

const SendPayment = dynamic(() => import("~/steps/SendPayment"), {
  loading: () => <FullScreenLoader />,
});

const RequestPayment = dynamic(() => import("~/steps/RequestPayment"), {
  loading: () => <FullScreenLoader />,
});

const Home = dynamic(() => import("~/steps/Home"), {
  loading: () => <FullScreenLoader />,
});

const About = dynamic(() => import("~/steps/About"), {
  loading: () => <FullScreenLoader />,
});

export const steps: ReactElement[] = [
  <Home key="home" />,
  <RequestPayment key="request-payment" />,
  <SendPayment key="send-payment" />,
  <About key="about" />,
];

export const TOTAL_STEPS = steps.length;
