import { Metadata } from "next";
import LandingPage from "~/components/web/LandingPage";

const APP_URL = "https://paywithwarpcast.xyz";

const frame = {
  version: "next",
  imageUrl: `${APP_URL}/opengraph-image.png`,
  button: {
    title: "Pay or Request",
    action: {
      type: "launch_frame",
      name: "Pay With Warpcast",
      url: `${APP_URL}/frame`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: "#000000",
    },
  },
};

export const revalidate = 300;

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

export default function Home() {
  return <LandingPage />;
}
