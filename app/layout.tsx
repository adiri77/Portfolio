import type { Metadata } from "next";
import { Jost, Bodoni_Moda, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Singh - Portfolio",
  description:
    "SDE portfolio — agentic AI systems, LLM orchestration, distributed backend architecture, and production microservices.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable} ${bodoni.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-transparent font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
