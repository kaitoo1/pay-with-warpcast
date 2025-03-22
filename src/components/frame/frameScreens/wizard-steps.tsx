import { ReactElement } from "react";
import FullScreenLoader from "~/components/FullScreenLoader";
import dynamic from "next/dynamic";

const SendPayment = dynamic(
  () => import("~/components/frame/frameScreens/SendPayment"),
  {
    loading: () => <FullScreenLoader />,
  }
);

const RequestPayment = dynamic(
  () => import("~/components/frame/frameScreens/RequestPayment/RequestPayment"),
  {
    loading: () => <FullScreenLoader />,
  }
);

const Home = dynamic(() => import("~/components/frame/frameScreens/Home"), {
  loading: () => <FullScreenLoader />,
});

const About = dynamic(() => import("~/components/frame/frameScreens/About"), {
  loading: () => <FullScreenLoader />,
});

export const steps: ReactElement[] = [
  <Home key="home" />,
  <RequestPayment key="request-payment" />,
  <SendPayment key="send-payment" />,
  <About key="about" />,
];

export const TOTAL_STEPS = steps.length;
