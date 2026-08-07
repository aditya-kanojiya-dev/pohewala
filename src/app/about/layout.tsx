import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "The Pohewala journey — from a Nagpur morning ritual to India's first poha QSR chain. Meet the founders, our mission, vision and values.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
