import { Metadata } from "next";
import { APP_URL } from "~/app/page";

type Props = {
  params: Promise<{ imageUrl: string; auraType: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  try {
    // const { imageUrl } = await params;
    // const { auraType } = await searchParams;
    const paddingTop = 50; // pixels of padding on top
    const paddingBottom = 50; // pixels of padding on bottom

    const frame = {
      version: "next",
      imageUrl: `${APP_URL}/opengraph-image`,
      button: {
        title: "Launch Frame",
        action: {
          type: "launch_frame",
          name: "Pay With Warpcast",
          url: APP_URL,
          splashImageUrl: `${APP_URL}/splash.png`,
          splashBackgroundColor: "#000000",
        },
      },
    };

    return {
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

export default function MoshiFrame() {
  return <div>Moshi Frame</div>;
}
