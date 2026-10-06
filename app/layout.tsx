import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "03 STYLLE — Não siga o padrão. Vista 03.",
  description: "Campanhas, coleções e streetwear da 03 STYLLE.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
