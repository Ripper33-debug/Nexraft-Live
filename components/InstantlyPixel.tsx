import Script from "next/script";

/** Instantly Website Visitors pixel (Apollo-powered tracker from Instantly setup). */
const INSTANTLY_PIXEL_APP_ID = "6a36c4a65587fa00189a7358";

export function InstantlyPixel() {
  return (
    <Script id="instantly-website-visitors" strategy="afterInteractive">
      {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"${INSTANTLY_PIXEL_APP_ID}"})},
document.head.appendChild(o)}initApollo();`}
    </Script>
  );
}
