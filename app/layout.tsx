import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Grain } from "@/components/Grain";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StructuredData } from "@/components/StructuredData";
import { CookieNotice } from "@/components/CookieNotice";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StickyBookCall } from "@/components/StickyBookCall";
import { InstantlyPixel } from "@/components/InstantlyPixel";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexraft · Custom Web Tools Studio",
    template: "%s · Nexraft",
  },
  description:
    "Custom web tools for companies with complex products and workflows. 3D viewers, quote systems, customer portals, and integrations from $3k. Managed partner plans from $750/mo.",
  metadataBase: new URL("https://nexraft.com"),
  openGraph: {
    title: "Nexraft · Custom Web Tools Studio",
    description:
      "We build the custom tools your website is missing. 3D product experiences, quote flows, portals, and integrations.",
    type: "website",
    siteName: "Nexraft",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexraft",
    description:
      "Custom web tools for complex products and workflows. 3D, quotes, portals, integrations.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0e0c",
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
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="relative min-h-screen overflow-x-clip bg-ink font-body text-bone antialiased">
        <LoadingScreen />
        <StructuredData />
        <Grain />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink2 focus:px-4 focus:py-2 focus:font-jetbrains focus:text-sm focus:text-signal"
        >
          Skip to content
        </a>
        <div className="site-shell relative z-10">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <CookieNotice />
        <StickyBookCall />
        <Analytics />
        <InstantlyPixel />
      </body>
    </html>
  );
}
