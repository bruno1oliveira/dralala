import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vereadora Dra. Lalá | Gabinete Digital",
  description: "Plataforma digital do Gabinete da Vereadora Dra. Lalá - PSD. Advogada comprometida com a justiça social, direitos das mulheres e o desenvolvimento da cidade.",
  keywords: ["Vereadora", "Dra. Lalá", "PSD", "Gabinete Digital", "Caraguatatuba", "Advogada"],
  authors: [{ name: "Gabinete Vereadora Dra. Lalá" }],
  openGraph: {
    title: "Vereadora Dra. Lalá | Gabinete Digital",
    description: "Advogada comprometida com a justiça social e os direitos da população.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
