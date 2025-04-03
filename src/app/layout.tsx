import "@/styles/globals.css";

import { type Metadata } from "next";
import { Providers } from "./providers";
import { Suspense } from "react";
export const metadata: Metadata = {
  metadataBase: new URL("https://creekocw.com"),
  title: {
    default: "Cherry Creek High School Open CourseWare",
    template: "%s | Cherry Creek High School OCW",
  },
  description:
    "Access free educational resources and course materials from Cherry Creek High School's Open CourseWare program.",
  keywords: [
    "open courseware",
    "free education",
    "Cherry Creek High School",
    "creek",
    "CCHS",
    "saccomano",
    "CSHS",
    "free learning",
    "online learning",
    "high school courses",
  ],
  authors: [{ name: "Cherry Creek High School CSHS" }],
  creator: "Cherry Creek High School CSHS",
  publisher: "Cherry Creek High School CSHS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Cherry Creek High School Open CourseWare",
    description:
      "Access free educational resources and course materials from Cherry Creek High School's Open CourseWare program.",
    url: "https://creekocw.com",
    siteName: "Cherry Creek High School OCW",
    images: [
      {
        url: "https://creekocw.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cherry Creek High School Open CourseWare",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherry Creek High School Open CourseWare",
    description:
      "Access free educational resources and course materials from Cherry Creek High School's Open CourseWare program.",
    images: ["https://creekocw.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcODJnurmfb52Q6NjpkM7THVhzLqitUSY9d4rf",
    shortcut:
      "https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcODJnurmfb52Q6NjpkM7THVhzLqitUSY9d4rf",
    apple:
      "https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcODJnurmfb52Q6NjpkM7THVhzLqitUSY9d4rf",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading essential data...</div>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
