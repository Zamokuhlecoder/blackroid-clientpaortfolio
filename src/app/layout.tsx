import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import { Header } from "@/components/Header-Professional";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Blackroid Client Portfolio - Track Project Progress`,
  description: "Blackroid's professional client portal for tracking project progress in real-time. Secure, transparent, and built for client success.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${plexMono.variable}`}>
      <body className="bg-white">
        <Providers>
          <Header />
          <main id="main" className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
