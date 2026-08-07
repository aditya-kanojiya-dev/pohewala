import type { Metadata } from "next";

export const siteConfig = {
  name: "Pohewala",
  tagline: "India's First Authentic Poha QSR Chain",
  // ponytail: set NEXT_PUBLIC_SITE_URL in env to the real domain, or the
  // canonical URLs / sitemap / robots will point at the placeholder.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pohewala.example.com",
  ogImage: "/images/logo.png",
  description:
    "Pohewala is India's first poha-focused QSR brand delivering authentic Maharashtrian flavors, fresh tarri poha, and high-demand franchise opportunities.",
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: `${siteConfig.url}${siteConfig.ogImage}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
  };
}
