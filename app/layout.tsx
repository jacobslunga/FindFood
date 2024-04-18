import "./globals.css";
import "./fonts.css";
import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";
import Providers from "@/components/Providers";
import { Work_Sans } from "next/font/google";

const work = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FindFood AI",
  description: "Hitta de bästa restaurangerna nära dig",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={work.className}>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
