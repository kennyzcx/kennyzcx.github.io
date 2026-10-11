import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kenny",
  description: "kenny's personal website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="mx-10 sm:mx-24 pt-12 pb-2 min-h-screen">
          <div className="max-w-2xl w-full mx-auto flex flex-col">
            <SiteHeader />
            <main className="pt-16">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
