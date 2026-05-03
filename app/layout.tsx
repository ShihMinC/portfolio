import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shih-Min Chen — UX Designer",
  description: "UX & Product Designer specializing in B2B platforms and AI experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
