import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinanceFlow - AI-Powered Financial Management & Expense Tracking",
  description: "Connect all your financial accounts, track income and expenses, and manage your money in one place. Smart analytics, real-time insights, and seamless integration with banks, PayPal, and Stripe.",
  keywords: ["finance tracker", "expense tracker", "income tracker", "financial management", "budget app", "personal finance", "money management", "bank integration"],
  authors: [{ name: "FinanceFlow" }],
  openGraph: {
    title: "FinanceFlow - AI-Powered Financial Management",
    description: "Connect all your financial accounts and track income and expenses in one place",
    url: "https://financeflow24.com",
    siteName: "FinanceFlow",
    images: [
      {
        url: "https://financeflow24.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceFlow - AI-Powered Financial Management",
    description: "Connect all your financial accounts and track income and expenses in one place",
    images: ["https://financeflow24.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
