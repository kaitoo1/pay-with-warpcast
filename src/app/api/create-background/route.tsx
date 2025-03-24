import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
// import QRCode from "react-qr-code";
// import QRCode from "qrcode";
import { useMemo } from "react";

const BASE_URL =
  "https://www.warpcast.com/~/frames/launch?domain=paywithwarpcast.xyz";

// 3:2 aspect ratio dimensions
const WIDTH = 1200;
const HEIGHT = 800; // 1200 * (2/3)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const amount = searchParams.get("amount");
    const address = searchParams.get("address");
    const merchantName = searchParams.get("merchantName");

    const params = new URLSearchParams();

    if (merchantName) params.append("merchantName", merchantName);
    if (amount) params.append("amount", amount);
    if (address) params.append("address", address);

    // const qrUrl = `${BASE_URL}&${params.toString()}`;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              paddingTop: 60,
            }}
          >
            <p style={{ fontSize: 50, lineHeight: 1 }}>
              {merchantName} requests
            </p>
            <p style={{ fontSize: 130, lineHeight: 1, textAlign: "center" }}>
              ${amount}
            </p>
          </div>

          <p
            style={{
              fontSize: 30,
              lineHeight: 1,
              alignSelf: "flex-end",
              justifySelf: "flex-end",
              marginRight: 40,
              marginBottom: 40,
            }}
          >
            Pay with Warpcast
          </p>
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
