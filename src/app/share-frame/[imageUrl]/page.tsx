import { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

type Props = {
  params: Promise<{ imageUrl: string; auraType: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  try {
    const { imageUrl } = await params;
    const { auraType } = await searchParams;
    const paddingTop = 50; // pixels of padding on top
    const paddingBottom = 50; // pixels of padding on bottom
    const backgroundImageUrl = `${appUrl}/api/create-background?imageUrl=${imageUrl}&paddingTop=${paddingTop}&paddingBottom=${paddingBottom}&auraType=${auraType}`;

    const frame = {
      version: "next",
      imageUrl: backgroundImageUrl,
      button: {
        title: "Launch Frame",
        action: {
          type: "launch_frame",
          name: "Wizard Frame",
          url: appUrl,
          splashImageUrl: `${appUrl}/splash.png`,
          splashBackgroundColor: "#F3EBFF",
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
