import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lyra Real Estate | Kart Oluşturucu",
  description: "Kartvizit ve yaka kartı oluştur.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${unbounded.variable} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
