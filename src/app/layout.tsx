import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crônicas de Altherion - RPG Narrativo com IA",
  description: "Um RPG narrativo multiplayer onde vários jogadores participam da mesma história épica no mundo de Altherion. Crie seu herói e embarque em aventuras dinâmicas com IA.",
  keywords: "RPG, narrativo, IA, fantasia, Altherion, multiplayer, aventura",
  authors: [{ name: "Crônicas de Altherion" }],
  openGraph: {
    title: "Crônicas de Altherion",
    description: "RPG Narrativo com IA - Aventuras épicas em Altherion",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
