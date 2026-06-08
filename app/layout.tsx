import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GridOverlay } from "@/components/GridOverlay";
import { Grain } from "@/components/Grain";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionRail } from "@/components/SectionRail";
import { StudioCursor } from "@/components/StudioCursor";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexraft — Web, Hosting & 3D Studio",
    template: "%s — Nexraft",
  },
  description:
    "Everything you need to launch — and keep it fast. Engineering studio for web development, hosting, and 3D. Monthly retainers.",
  metadataBase: new URL("https://nexraft.com"),
  openGraph: {
    title: "Nexraft — Web, Hosting & 3D Studio",
    description: "Everything you need to launch — and keep it fast.",
    type: "website",
    siteName: "Nexraft",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexraft",
    description: "Everything you need to launch — and keep it fast.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f1b15",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="relative min-h-screen overflow-x-clip antialiased">
        <Grain />
        <GridOverlay />
        <ScrollProgress />
        <SectionRail />
        <StudioCursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface-deep focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent"
        >
          Skip to content
        </a>
        <div className="relative z-10">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
