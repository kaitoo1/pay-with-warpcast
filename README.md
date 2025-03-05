# 🖼️ Farcaster Miniapp Wizard (Frame v2)

[⭐️ Official Farcaster Demo Repo](https://github.com/farcasterxyz/frames-v2-demo/tree/main)<br/>
[🛠️ Frame Playground](https://warpcast.com/~/developers/frame-playground) (Mobile only)<br/>
[📦 Frame SDK](https://github.com/farcasterxyz/frames/)<br/>
[👀 Dev preview docs](https://github.com/farcasterxyz/frames/wiki/frames-v2-developer-playground-preview)<br/>

## Loom Overview

[📺 Loom overview of this repo](https://www.loom.com/share/e57353e0836f44d0a2cc0f4f983aede4?sid=21e16467-c6be-4524-ba53-fb774112943b)

<div style="display: flex; justify-content: space-between;">
  <img src="/src/docs/1.png" width="30%" alt="Step 1" />
  <img src="/src/docs/2.png" width="30%" alt="Step 2" />
  <img src="/src/docs/3.png" width="30%" alt="Step 3" />
</div>

## Getting Started (Moshicam specific)

This is a NextJS + TypeScript + React app built with Bun.

To install dependencies:

```bash
$ bun install
```

To run the app:

```bash
$ bun dev
```

Copy `.env.example` to `.env.local`

View the app via Warpcast's developer playground.
We're using ngrok to access our local dev server over the internet.

```bash
$ ngrok http 3000
```

Open this url on your mobile device. It should deep link to the Frame Playground in the Warpcast app.
[https://warpcast.com/~/developers/frame-playground](https://warpcast.com/~/developers/frame-playground).

Alternatively, you can enable Developer Tools in your Warpcast mobile app to access it directly from your Settings.

In the Frame Playground, enter your ngrok URL.

If you don't include the https:// the Warpcast app might crash.
