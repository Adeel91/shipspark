import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "600",
  ],
  variable: "--font-main",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
  ],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "ShipSpark",
    template: "%s | ShipSpark",
  },
  description:
    "ShipSpark understands product releases, decides when they deserve attention, and turns the strongest signal into action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-[#070a10] font-[var(--font-main)] text-[#edf3fa] antialiased">
        {children}
      </body>
    </html>
  );
}
