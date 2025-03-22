"use client";

import { Metadata } from "next";
import FrameAppContainer from "~/components/frame/FrameAppContainer";
import { APP_URL } from "../page";

export async function generateMetadata(): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error(error);
    return {
      title: "Error",
      description: "Error loading moshi",
    };
  }
}

// All Frame screens are rendered here with the new navigation system
export default function FramePage() {
  return <FrameAppContainer />;
}
