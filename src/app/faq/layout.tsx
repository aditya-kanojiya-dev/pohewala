import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about Pohewala India — our poha varieties, online ordering, catering, franchise opportunities, and store locations.",
  path: "/faq",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
