import { FrameProviders } from "./frameProviders";

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FrameProviders>{children}</FrameProviders>;
}
