import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Stories, recipes, and updates from Pohewala — India's first authentic poha QSR chain.",
  path: "/blog",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}