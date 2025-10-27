import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import PixelBlastBackground from "@/components/ui/PixelBlastBackground";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Ken Chen - Portfolio",
  description:
    "Computer Engineering student at the University of Toronto with a passion for building innovative solutions. Full-stack developer, AI enthusiast, and tech innovator.",
  keywords: [
    "Ken Chen",
    "Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "University of Toronto",
    "Computer Engineering",
  ],
  authors: [{ name: "Ken Chen" }],
  creator: "Ken Chen",
  openGraph: {
    title: "Ken Chen - Portfolio",
    description:
      "Computer Engineering student at the University of Toronto with a passion for building innovative solutions.",
    url: "https://kenchen.dev",
    siteName: "Ken Chen Portfolio",
    images: [
      {
        url: "/res/profilePic.JPG",
        width: 1200,
        height: 630,
        alt: "Ken Chen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ken Chen - Portfolio",
    description:
      "Computer Engineering student at the University of Toronto with a passion for building innovative solutions.",
    images: ["/res/profilePic.JPG"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="font-raleway text-white min-h-screen bg-black">
        <PixelBlastBackground />
        <div className="relative" style={{ zIndex: 10 }}>
          <Navigation />
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
