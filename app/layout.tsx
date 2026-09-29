import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/section/header/Header";
import Footer from "./components/section/footer/Footer";
import SmoothScroll from "./components/shared/SmoothScroll";

// Self-hosted so the build never depends on reaching fonts.googleapis.com.
// Allura ships weight 400 only, so anything bolder is synthesised.
const allura = localFont({
  src: [
    { path: "./fonts/Allura-Regular-latin.woff2", weight: "400", style: "normal" },
    {
      path: "./fonts/Allura-Regular-latin-ext.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-allura",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "Edusity",
  description: "Learn Today Built Tomorrow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${allura.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}