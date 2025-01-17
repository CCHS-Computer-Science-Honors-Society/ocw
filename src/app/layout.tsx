import "@/styles/globals.css";
import "@/styles/prosemirror.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Providers } from "./providers";

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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
