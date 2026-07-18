import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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
    default: "Nexraft · Web, Hosting, 3D & AI Studio",
    template: "%s · Nexraft",
  },
  description:
    "Custom website builds, WordPress and Squarespace migrations, managed hosting, SEO, and growth retainers. Care from $150/mo, Growth from $750/mo, builds from $3k. 3D and custom AI tools. Founding-client rates available.",
  metadataBase: new URL("https://nexraft.com"),
  openGraph: {
    title: "Nexraft · Web, Hosting, 3D & AI Studio",
    description:
      "Custom websites, migrations, managed hosting, SEO, and growth retainers. Build once, Care or Growth every month.",
    type: "website",
    siteName: "Nexraft",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexraft",
    description:
      "Built like infrastructure. Web, hosting, and 3D production.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: process.env.NEXT_PUBLIC_THEME === "forest" ? "#0a0e0c" : "#08080b",
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
      // "ember" (default orange) or "forest" (legacy green). Set
      // NEXT_PUBLIC_THEME=forest in Vercel to flip back to the old palette;
      // the WebGL scenes read the same CSS variables so they recolor too.
      data-theme={process.env.NEXT_PUBLIC_THEME === "forest" ? "forest" : "ember"}
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="relative min-h-screen overflow-x-clip bg-ink font-body text-bone antialiased">
        {children}
        <Analytics />
        <InstantlyPixel />
      </body>
    </html>
  );
}
