import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Indian Language Converter - Transliterate to Indian Languages",
    template: "%s | Indian Language Converter",
  },
  description:
    "Free online tool to transliterate from English to Indian languages including Hindi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Oriya, and Punjabi. Real-time conversion with Unicode support.",
  keywords: [
    "Indian language converter",
    "transliteration",
    "Hindi converter",
    "Bengali converter",
    "Tamil converter",
    "Telugu converter",
    "Gujarati converter",
    "Kannada converter",
    "Malayalam converter",
    "Oriya converter",
    "Punjabi converter",
    "Unicode converter",
    "Devanagari",
  ],
  authors: [
    {
      name: "Deepak Kamboj",
      url: "mailto:deepakkamboj@gmail.com",
    },
  ],
  creator: "Deepak Kamboj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deepakkamboj.github.io/indianlanguageconverter",
    title: "Indian Language Converter - Transliterate to Indian Languages",
    description:
      "Free online tool to transliterate from English to Indian languages with real-time conversion and Unicode support.",
    siteName: "Indian Language Converter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Language Converter",
    description:
      "Transliterate from English to 9 Indian languages with ease",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AppLayout>{children}</AppLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
