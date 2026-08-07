import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Menu",
  description:
    "Freshly made poha, rich in flavor and tradition — Nagpuri Tarri Poha, Indori Sev Poha, snacks and beverages at pocket-friendly prices.",
  path: "/menu",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
