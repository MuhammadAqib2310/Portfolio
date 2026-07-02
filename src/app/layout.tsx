import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M Aqib — AI Engineer & Full Stack Developer",
  description: "World-class AI Engineer & Full Stack Developer specializing in AI Agents, SaaS Platforms, Workflow Automation and Modern Web Applications.",
  keywords: ["AI Engineer", "Full Stack Developer", "AI Agents", "SaaS", "Workflow Automation"],
  authors: [{ name: "M Aqib" }],
  openGraph: {
    title: "M Aqib — AI Engineer & Full Stack Developer",
    description: "Building the future with AI & Modern Web Technologies",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
