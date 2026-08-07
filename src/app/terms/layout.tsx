import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the Pohewala website and services.",
  path: "/terms",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
