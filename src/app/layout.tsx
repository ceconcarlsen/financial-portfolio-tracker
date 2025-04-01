"use client";

import { Inter } from "next/font/google";

import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { PortfolioProvider } from "@/context/usePortfolio.context";
import { TradeProvider } from "@/context/useTrade.context";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TradeProvider>
        <PortfolioProvider>
          <ToastProvider>{children}</ToastProvider>
        </PortfolioProvider>
      </TradeProvider>
    </QueryClientProvider>
  );
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="dark" lang="en">
      <Providers>
        <body className={`${inter.className} min-h-screen`}>
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
