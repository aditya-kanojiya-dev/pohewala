import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "A glimpse into Pohewala's food, outlets, culture, and growing movement across India.",
  path: "/gallery",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
