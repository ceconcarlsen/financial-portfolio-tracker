import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { PROJECT_CONFIG } from "@/config/project-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: PROJECT_CONFIG.name,
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="dark" lang="en">
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <body className={`${inter.className} min-h-screen`}>
            {children}
            <Toaster />
          </body>
        </ToastProvider>
      </QueryClientProvider>
    </html>
  );
}
