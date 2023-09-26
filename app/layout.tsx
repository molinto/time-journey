import { Satisfy, Poppins } from "next/font/google";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { NextAuthProvider } from "./providers/SessionProvider";
import ToasterProvider from "./providers/ToasterProvider";
import { ReduxProvider } from "./providers/ReduxProvider";
import React from "react";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-satisfy",
});

export const metadata = {
  title: "Manx Time Journey",
  description:
    "Test your knowledge of Manx historical events and cultural trends",
  icons: "/favicon/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.className} ${satisfy.variable}`}>
      <body>
        <NextAuthProvider>
          <ReduxProvider>
            <ToasterProvider />
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <main className="flex h-full flex-col items-center justify-start bg-honeydew pt-12 md:pt-16">
              {children}
            </main>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
