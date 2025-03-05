import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

const moshiBlack = "#111111"; // Fallback color

const styles = {
  imageContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

// 3:2 aspect ratio dimensions
const WIDTH = 1200;
const HEIGHT = 800; // 1200 * (2/3)

// Aura color definitions
const auraColors = {
  ruby: { top: "#FA95C2", bottom: "#A51317" },
  sapphire: { top: "#6A93FF", bottom: "#1B295E" },
  rosequartz: { top: "#F4A6A6", bottom: "#A83256" },
  moonstone: { top: "#AFCBFF", bottom: "#435685" },
  aquamarine: { top: "#9DC7FF", bottom: "#7FCCB6" },
  coral: { top: "#FF9E78", bottom: "#9E2A2B" },
  copper: { top: "#D88C63", bottom: "#E84A42" },
  clementine: { top: "#FFA759", bottom: "#F25227" },
  topaz: { top: "#FFD166", bottom: "#F29A7E" },
  jade: { top: "#A4D77F", bottom: "#215A42" },
  sage: { top: "#AEA6D9", bottom: "#436D50" },
  teal: { top: "#9FA9CB", bottom: "#124F5D" },
  midnight: { top: "#642C75", bottom: "#0F1969" },
  periwinkle: { top: "#C6B9FF", bottom: "#5C4A9E" },
  amethyst: { top: "#E09DE7", bottom: "#921765" },
  lilac: { top: "#C9AFF9", bottom: "#9DBAEA" },
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get("imageUrl");
    const paddingTop = parseInt(searchParams.get("paddingTop") || "50");
    const paddingBottom = parseInt(searchParams.get("paddingBottom") || "50");
    const auraType = searchParams.get("auraType")?.toLowerCase() || "ruby";

    if (!imageUrl) {
      return new Response("Image URL is required", { status: 400 });
    }

    // Get gradient colors based on auraType
    const colors = auraColors[auraType as keyof typeof auraColors] || {
      top: moshiBlack,
      bottom: moshiBlack,
    };

    // Calculate image height to maintain original aspect ratio
    // but ensure the overall container has 3:2 aspect ratio
    const imageHeight = HEIGHT - (paddingTop + paddingBottom);

    return new ImageResponse(
      (
        <div
          style={{
            ...styles.imageContainer,
            background: `linear-gradient(to bottom, ${colors.top}, ${colors.bottom})`,
          }}
        >
          <img
            src={decodeURIComponent(imageUrl)}
            alt=""
            style={{
              height: `${imageHeight}px`,
              marginTop: `${paddingTop}px`,
              marginBottom: `${paddingBottom}px`,
              objectFit: "contain",
            }}
          />
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
