import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import Footer from "@/components/Footer";

import { Toaster } from "react-hot-toast";

import Providers from "@/providers/ThemeProvider";

import Navbar from "@/components/navbar/Navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: {
    default: "IdeaVault",
    template: "%s | IdeaVault",
  },
  description: "Startup idea sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className="min-h-full flex flex-col bg-white text-black dark:bg-[#020617] dark:text-white"
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />

          <main className="flex-1">
            {children}

            <Toaster position="top-center" />
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
