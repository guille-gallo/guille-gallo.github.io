import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Guille Gallo - Senior Developer",
    default: "Guille Gallo - Senior Developer",
  },
  description:
    "Senior Developer portfolio showcasing projects, skills, and experience in web development.",
  keywords: ["developer", "portfolio", "web development", "software engineer"],
  authors: [{ name: "Guille Gallo" }],
  creator: "Guille Gallo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://guille-gallo.github.io",
    siteName: "Guille Gallo Portfolio",
    title: "Guille Gallo - Senior Developer",
    description:
      "Senior Developer portfolio showcasing projects, skills, and experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guille Gallo - Senior Developer",
    description:
      "Senior Developer portfolio showcasing projects, skills, and experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <svg className="liquid__svg-defs" aria-hidden="true" focusable="false">
          <defs>
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              />
            </filter>
          </defs>
        </svg>
        <div className="liquid" aria-hidden="true">
          <div className="liquid__layer">
            <div className="liquid__blob liquid__blob--1" />
            <div className="liquid__blob liquid__blob--2" />
            <div className="liquid__blob liquid__blob--3" />
            <div className="liquid__blob liquid__blob--4" />
          </div>
        </div>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
