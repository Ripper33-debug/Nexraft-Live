import { Grain } from "@/components/Grain";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StructuredData } from "@/components/StructuredData";
import { CookieNotice } from "@/components/CookieNotice";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import { StickyBookCall } from "@/components/StickyBookCall";

// Inner pages (pricing, work, legal, status, notes, pay, landing pages) keep
// the existing design system + shell. The homepage lives outside this group
// and renders the rebuilt one-pager with its own header/footer.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <CursorGlow />
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
    </>
  );
}
