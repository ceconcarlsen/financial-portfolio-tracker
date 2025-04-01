"use client";

import { Inter } from "next/font/google";

import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { PortfolioProvider } from "@/context/usePortfolio.context";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="dark" lang="en">
      <QueryClientProvider client={queryClient}>
        <PortfolioProvider>
          <ToastProvider>
            <body className={`${inter.className} min-h-screen`}>
              {children}
              <Toaster />
            </body>
          </ToastProvider>
        </PortfolioProvider>
      </QueryClientProvider>
    </html>
  );
}
