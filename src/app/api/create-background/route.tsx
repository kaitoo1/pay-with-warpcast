import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

const styles = {
  imageContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
    color: "white",
  },
};

// 3:2 aspect ratio dimensions
const WIDTH = 1200;
const HEIGHT = 800; // 1200 * (2/3)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get("imageUrl");
    const paddingTop = parseInt(searchParams.get("paddingTop") || "50");
    const paddingBottom = parseInt(searchParams.get("paddingBottom") || "50");
    const auraType = searchParams.get("auraType")?.toLowerCase() || "ruby";

    // if (!imageUrl) {
    //   return new Response("Image URL is required", { status: 400 });
    // }

    // Get gradient colors based on auraType
    // const colors = auraColors[auraType as keyof typeof auraColors] || {
    //   top: moshiBlack,
    //   bottom: moshiBlack,
    // };

    // Calculate image height to maintain original aspect ratio
    // but ensure the overall container has 3:2 aspect ratio
    const imageHeight = HEIGHT - (paddingTop + paddingBottom);

    return new ImageResponse(
      (
        <div
          style={{
            ...styles.imageContainer,
          }}
          className="bg-black text-white"
        >
          <p style={{ fontSize: 80 }}>Pay with Warpcast</p>
        </div>
      ),
      {
        width: WIDTH,
        height: HEIGHT,
      }
    );
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response("Failed to generate the image", { status: 500 });
  }
}
