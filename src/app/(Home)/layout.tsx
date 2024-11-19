"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToastContainer from "@/components/ToastContainer";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Gamanika | R. C. Patel Institute of Technology</title>
      </head>
      <body className={`${inter.className}`}>
        <ToastContainer />
        <Header />
        {children}
        {/* <Footer /> */}
        <ScrollToTop />
      </body>
    </html>
  );
}
