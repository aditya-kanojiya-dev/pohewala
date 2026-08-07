import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Franchise",
  description:
    "Inviting franchise partners — QSR, Sports Cafe and Signature Store models with low investment, high ROI and complete training and support.",
  path: "/partner",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
