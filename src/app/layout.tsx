import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { TimeProvider } from "@/components/ui/TimeAgo";
import NarrowLayout from "@/components/NarrowLayout";
import { WalletProvider } from "@/components/Wallet";

export const metadata: Metadata = {
  title: "[Redacted] Explorer",
  description: "Your navigation through NEAR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
      />
      <TimeProvider>
        <WalletProvider>
          <body className="flex h-full max-w-full dark text-foreground bg-background">
            <div className="w-full overflow-x-hidden">
              <NarrowLayout>
                <Header />
                {children}
              </NarrowLayout>
            </div>
          </body>
        </WalletProvider>
      </TimeProvider>
    </html>
  );
}
