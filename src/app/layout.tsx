import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const BASE_URL = "https://muhammadaqib.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Muhammad Aqib — AI Engineer & Full Stack Developer | Pakistan",
    template: "%s | Muhammad Aqib",
  },
  description:
    "Muhammad Aqib is a top-rated AI Engineer & Full Stack Developer from Pakistan specializing in AI Agents, SaaS Platforms, LangChain, OpenAI, Next.js and Workflow Automation. Hire for freelance AI projects.",

  keywords: [
    "Muhammad Aqib",
    "AI Engineer Pakistan",
    "Full Stack Developer Pakistan",
    "AI Agent Developer",
    "SaaS Developer",
    "LangChain Developer",
    "OpenAI Developer",
    "Next.js Developer",
    "Freelance AI Engineer",
    "Workflow Automation",
    "Python Developer",
    "FastAPI Developer",
    "Hire AI Developer",
    "AI Freelancer",
    "M Aqib portfolio",
    "AI SaaS Pakistan",
    "Multan developer",
  ],

  authors: [{ name: "Muhammad Aqib", url: BASE_URL }],
  creator: "Muhammad Aqib",
  publisher: "Muhammad Aqib",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Muhammad Aqib — AI Engineer",
    title: "Muhammad Aqib — AI Engineer & Full Stack Developer",
    description:
      "Top-rated AI Engineer & Full Stack Developer from Pakistan. Building AI Agents, SaaS Platforms, and intelligent automation systems for global clients.",
    images: [
      {
        url: "/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Aqib — AI Engineer & Full Stack Developer",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@MuhammadAqibDev",
    creator: "@MuhammadAqibDev",
    title: "Muhammad Aqib — AI Engineer & Full Stack Developer",
    description:
      "Top-rated AI Engineer from Pakistan. Building AI Agents, SaaS Platforms & automation systems.",
    images: ["/avatar.jpg"],
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

  verification: {
    google: "google-site-verification-placeholder",
  },

  category: "technology",
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Aqib",
  alternateName: "M Aqib",
  url: BASE_URL,
  image: `${BASE_URL}/avatar.jpg`,
  email: "aqibm8123@gmail.com",
  telephone: "+923375013984",
  jobTitle: "AI Engineer & Full Stack Developer",
  description:
    "Top-rated AI Engineer & Full Stack Developer specializing in AI Agents, SaaS Platforms, and Workflow Automation.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Multan",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/MuhammadAqib2310",
    "https://linkedin.com/in/muhammad-aqib-dev",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "LangChain",
    "OpenAI",
    "Next.js",
    "React",
    "Python",
    "FastAPI",
    "SaaS Development",
    "Workflow Automation",
  ],
  offers: {
    "@type": "Offer",
    description: "Freelance AI Engineering & Full Stack Development services",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={BASE_URL} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
