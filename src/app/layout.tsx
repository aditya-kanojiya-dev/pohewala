import type { Metadata, Viewport } from "next";
import { Poppins, Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnquireModal } from "@/components/layout/EnquireModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Pohewala - India's First Authentic Poha QSR Chain",
    template: "%s | Pohewala",
  },
  description:
    "Pohewala is India's first poha-focused QSR brand delivering authentic Maharashtrian flavors, fresh tarri poha, and high-demand franchise opportunities.",
  openGraph: {
    title: "Pohewala - India's First Authentic Poha QSR Chain",
    description:
      "Authentic Maharashtrian tarri poha, fast-growing QSR franchise across India.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${sourceSerif.variable} ${inter.variable} h-full antialiased`}>
      <body className={`${poppins.className} min-h-full flex flex-col bg-pohe-gradient text-white selection:bg-[#E6DA34] selection:text-neutral-950 overflow-x-hidden`}>
        <ModalProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <EnquireModal />
        </ModalProvider>
      </body>
    </html>
  );
}
