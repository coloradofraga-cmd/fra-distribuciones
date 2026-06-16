import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

const BASE_URL = "https://fra-distribuciones.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FRA Distribuciones — Productos de limpieza",
    template: "%s | FRA Distribuciones",
  },
  description: "Comprá productos de limpieza para el hogar con entrega a domicilio. Detergentes, desinfectantes, lavandinas y más.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: BASE_URL,
    siteName: "FRA Distribuciones",
    title: "FRA Distribuciones — Productos de limpieza",
    description: "Comprá productos de limpieza para el hogar con entrega a domicilio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fraga" />
        <meta name="theme-color" content="#00362e" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Toaster
          position="bottom-center"
          offset={{ bottom: 88 }}
          toastOptions={{
            style: {
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "14px",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
