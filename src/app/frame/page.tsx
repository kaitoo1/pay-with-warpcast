"use client";

import { Metadata } from "next";
import FrameAppContainer from "~/components/frame/FrameAppContainer";
import { APP_URL } from "../page";

const frame = {
  version: "next",
  imageUrl: `${APP_URL}/opengraph-image`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "Pay With Warpcast",
      url: `${APP_URL}/frame`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: "#000000",
    },
  },
};
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pay With Warpcast",
    openGraph: {
      title: "Pay With Warpcast",
      description: "by Kaito",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

// All Frame screens are rendered here with the new navigation system
export default function FramePage() {
  return <FrameAppContainer />;
}
