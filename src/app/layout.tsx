import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// const NotoSans = Poppins({
//   subsets: ["latin"],
//   variable: "--font-noto-sans",
//   display: "swap",
//   weight: ["400", "600", "800"],

// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark hide-scrollbar" lang="en">
      <body className={`dark:bg-background  antialiased  `}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
