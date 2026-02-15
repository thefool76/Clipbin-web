import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteUrl = getSiteUrl();
const siteName = "Clipbin";
const siteDescription =
  "Share text instantly with secure links, optional passwords, and automatic expiry. Clipbin keeps notes and snippets fast, private, and temporary.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  icons: {
    icon: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
    apple: [{ url: "/favicon.ico?v=2" }]
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Clipbin",
    "temporary text sharing",
    "share snippets",
    "secure text links",
    "password protected notes",
    "expiring notes"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | Fast Temporary Text Sharing`,
    description: siteDescription
  },
  twitter: {
    card: "summary",
    title: `${siteName} | Fast Temporary Text Sharing`,
    description: siteDescription
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
