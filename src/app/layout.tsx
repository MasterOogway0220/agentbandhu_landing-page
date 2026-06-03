import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ttcPro = localFont({
  src: "../../public/fonts/TTCPro.woff2",
  variable: "--font-ttc",
  display: "swap",
  weight: "500",
});

const gliker = localFont({
  src: [
    {
      path: "../../public/fonts/Gliker-RegularSemiCondensed.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gliker-SemiBoldSemiCondensed.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-gliker",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentbandhu.in"),
  title: "AgentBandhu — never miss a renewal again",
  description:
    "WhatsApp CRM built for India's insurance agents. Birthday wishes, renewal reminders, two-way inbox. From ₹1,999 a month.",
  icons: {
    icon: [
      { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/seo/apple-touch-icon-180.png", sizes: "180x180" },
  },
  manifest: "/seo/manifest.webmanifest",
  openGraph: {
    title: "AgentBandhu — never miss a renewal again",
    description:
      "WhatsApp CRM built for India's insurance agents. Birthday wishes, renewal reminders, two-way inbox. From ₹1,999 a month.",
    url: "https://agentbandhu.in/",
    siteName: "AgentBandhu",
    type: "website",
    locale: "en_IN",
    images: [
      { url: "/seo/opengraph.jpg", width: 1200, height: 630 },
      { url: "/seo/opengraph-square.jpg", width: 400, height: 400 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentBandhu — never miss a renewal again",
    images: ["/seo/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${ttcPro.variable} ${gliker.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--pom-bg)] text-[var(--pom-wine)]">
        {children}
      </body>
    </html>
  );
}
