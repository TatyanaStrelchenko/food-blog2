import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/layout/header";
import { Providers } from "./providers/provider";
import { siteConfig } from "@/config/site.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import { AppLoader } from "@/hoc/app-loader";
import { Title } from "@/components/UI/layout/title";

interface Session {
  user?: { name?: string; email?: string; image?: string }
  expires: string
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <Title />
              <main className="flex flex-col items-center mx-auto px-[24px] justify-center max-w-[1024px]">
                {children}
              </main>
              <footer className="flex justify-center pt-10">
                {siteConfig.description}
              </footer>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
