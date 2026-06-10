import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Suspense } from "react";
import { AppKit } from "../context/appkit";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import Preloader from "@/components/shell/Preloader";
import CustomCursor from "@/components/shell/CustomCursor";
import UrgencyBar from "@/components/shell/UrgencyBar";
import StickyPresaleWidget from "@/components/shell/StickyPresaleWidget";
import MobileBottomBar from "@/components/shell/MobileBottomBar";
import PresaleCanvas from "@/app/presale/components/PresaleCanvas";
import AuthProvider from "@/components/session/providers";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://securitynet.ai";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Securitynet — Intelligence-Grade Security, Tokenized",
    template: "%s | Securitynet",
  },
  description:
    "Securitynet leverages cutting-edge AI for facial recognition, real-time alerts, and comprehensive monitoring — now fuelled by blockchain technology through the XN token.",
  keywords: [
    "Securitynet",
    "XN token",
    "AI security",
    "blockchain surveillance",
    "BEP-20 token",
    "XN presale",
    "facial recognition AI",
    "smart surveillance",
  ],
  openGraph: {
    title: "Securitynet — Intelligence-Grade Security, Tokenized",
    description:
      "Securitynet leverages cutting-edge AI for facial recognition, real-time alerts, and comprehensive monitoring — now fuelled by blockchain technology through the XN token.",
    url: "/",
    siteName: "Securitynet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Securitynet — Intelligence-Grade Security, Tokenized",
    description:
      "Securitynet leverages cutting-edge AI for facial recognition, real-time alerts, and comprehensive monitoring — now fuelled by blockchain technology through the XN token.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
        <AppKit>
          {/* Background canvas — direct body child at z:0, below all z:1 content */}
          <PresaleCanvas />
          <Preloader />
          <CustomCursor />
          <UrgencyBar />
          <StickyPresaleWidget />
          <MobileBottomBar />
          {/* z:1 wrapper ensures all page content paints above canvas */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <SmoothScrollProvider>
              <Suspense>
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-gold)",
                      borderRadius: 0,
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                    },
                    success: { iconTheme: { primary: "#4A8C6F", secondary: "#0A0A0E" } },
                    error:   { iconTheme: { primary: "#A85252", secondary: "#0A0A0E" } },
                  }}
                />
                <GoogleAnalytics gaId="G-DJF0D3925S" />
                <GoogleTagManager gtmId="GTM-TZV4KLBP" />
              </Suspense>
            </SmoothScrollProvider>
          </div>
        </AppKit>
        </AuthProvider>
      </body>
    </html>
  );
}
