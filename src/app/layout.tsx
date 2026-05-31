import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { designTokens } from "@/lib/design-tokens";

export const metadata: Metadata = {
  title: "Learnnify",
  description: "AI learning widget service MVP",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={designTokens.fontsUrl} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
