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
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden bg-neutral-100 text-slate-900 antialiased`}
      >
        {/* Soft background shapes for glass effect */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-neutral-200 blur-3xl animate-float-1" />
          <div className="absolute -right-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-neutral-200 blur-3xl animate-float-2" />
          <div className="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-neutral-300/50 blur-3xl animate-float-3" />
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
