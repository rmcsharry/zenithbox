import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import ReactQueryClientProvider from '@/utils/QueryClientProvider';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "ZenithBox IDE",
  description: "An IDE for ZenithBox",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Navbar />
        <ReactQueryClientProvider>
          <main>
            {children}
          </main>
          <Toaster />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
