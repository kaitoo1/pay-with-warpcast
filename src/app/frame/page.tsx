import { Metadata } from "next";
import FrameAppContainer from "~/components/frame/FrameAppContainer";

const APP_URL = "https://paywithwarpcast.xyz";

const defaultFrame = {
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

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { amount, address, merchantName } = await searchParams;

  if (amount && address && merchantName) {
    const backgroundImageUrl = `${APP_URL}/api/create-background?amount=${amount}&address=${address}&merchantName=${merchantName}`;
    const requestPaymentFrame = {
      version: "next",
      imageUrl: backgroundImageUrl,
      button: {
        title: "Pay",
        action: {
          type: "launch_frame",
          name: "Pay With Warpcast",
          url: `${APP_URL}/frame?amount=${amount}&address=${address}&merchantName=${merchantName}`,
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
        "fc:frame": JSON.stringify(requestPaymentFrame),
      },
    };
  }

  return {
    title: "Pay With Warpcast",
    openGraph: {
      title: "Pay With Warpcast",
      description: "by Kaito",
    },
    other: {
      "fc:frame": JSON.stringify(defaultFrame),
    },
  };
}

// All Frame screens are rendered here with the new navigation system
export default function FramePage() {
  return <FrameAppContainer />;
}
