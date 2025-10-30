import type { Metadata } from "next";
import { MagazineLayout } from "@/components/MagazineLayout";
import { ChatWidget } from "@/components/chat/ChatWidget";
import "./globals.css";
import "../styles/net-yorker-theme.css";

export const metadata: Metadata = {
  title: "The Apt Finder - A Place of Your Own",
  description:
    "Real Places. Real People. Real Belonging. A magazine-style guide to senior housing search.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;600&family=Source+Sans+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[--color-bg]">
        <MagazineLayout>
          {children}
        </MagazineLayout>
        <ChatWidget />
      </body>
    </html>
  );
}
