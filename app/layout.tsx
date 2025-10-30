
import type { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Place of Your Own - Senior Apartment Finder",
  description: "Finding your place in the next chapter. A dignified, joyful approach to senior housing search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
