// https://docs.farcaster.xyz/developers/frames/v2/spec#frame-manifest
// set your farcaster `accountAssociation` by using the Domains feature
// in the Warpcast Mobile App after enabling Developer Tools.

export async function GET() {
  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjIzODMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhGMzk4QjJEMTNiYTdFOWM3RDIxOUY1N2I3MjQ5NkE0YzA5RGM3MDM1In0",
      payload: "eyJkb21haW4iOiJwYXl3aXRod2FycGNhc3QueHl6In0",
      signature:
        "MHhjYmQ1M2UzMDc2M2M1ZjZiMmJkZmIwOGFlYjk5OTYzNGE0Njc2NTMyZDJlNDVmZWNlZmRkZjIzOTg1ZGViZWZkNmJjNDU5MTM1Yzc4ZjZiMTkyMmNiYTkyNjFiNDExMGM1N2NiYTE0ZGYxNTk3Y2ZiNDgyN2U2YWRjYzdlNmFmNTFi",
    },
    frame: {
      version: "1",
      name: "Pay",
      iconUrl: "https://paywithwarpcast.xyz/splash.png",
      homeUrl: "https://paywithwarpcast.xyz/frame",
      imageUrl: "https://paywithwarpcast.xyz/opengraph-image.png",
      buttonTitle: "Pay or Request",
      splashImageUrl: "https://paywithwarpcast.xyz/splash.png",
      splashBackgroundColor: "#eeccff",
      webhookUrl: "https://paywithwarpcast.xyz/api/webhook",
    },
  };

  return Response.json(config);
}
