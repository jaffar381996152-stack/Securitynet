import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Suspense } from "react";
import { AppKit } from "../context/appkit";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import AuroraField from "@/components/animations/AuroraField";
import ScanlineSweep from "@/components/animations/ScanlineSweep";
import CursorGlow from "@/components/animations/CursorGlow";
import PageTransition from "@/components/animations/PageTransition";
import IntroOverlay from "@/components/intro/IntroOverlay";
import ToastCoin from "@/components/brand/ToastCoin";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://securitynet.ai";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Securitynet — AI Eyes, Safe Skies Fueled By Blockchain Technology",
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
    title: "Securitynet — AI Eyes, Safe Skies Fueled By Blockchain Technology",
    description:
      "Securitynet leverages cutting-edge AI for facial recognition, real-time alerts, and comprehensive monitoring — now fuelled by blockchain technology through the XN token.",
    url: "/",
    siteName: "Securitynet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Securitynet — AI Eyes, Safe Skies Fueled By Blockchain Technology",
    description:
      "Securitynet leverages cutting-edge AI for facial recognition, real-time alerts, and comprehensive monitoring — now fuelled by blockchain technology through the XN token.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Favicon is auto-generated from src/app/icon.svg (Next.js file convention) — no manual icons entry needed
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppKit>
          <AuroraField />
          <ScanlineSweep />
          <CursorGlow />
          <IntroOverlay />
          <SmoothScrollProvider>
            <Suspense>
              <PageTransition>{children}</PageTransition>
              <Toaster
                position="top-right"
                toastOptions={{
                  className: "glass-card",
                  style: {
                    background: "var(--bg-surface-md)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "var(--radius-button)",
                    color: "var(--text-primary)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                  },
                  success: { icon: <ToastCoin tone="success" /> },
                  error: { icon: <ToastCoin tone="error" /> },
                  loading: { icon: <ToastCoin tone="brand" /> },
                }}
              />
              <GoogleAnalytics gaId="G-DJF0D3925S" />
              <GoogleTagManager gtmId="GTM-TZV4KLBP" />
            </Suspense>
          </SmoothScrollProvider>
        </AppKit>
      </body>
    </html>
  );
}
