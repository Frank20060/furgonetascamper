import { Krona_One, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "./providers";


const kronaOne = Krona_One({
  variable: "--font-krona",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Tipamos el objeto metadata con el tipo nativo de Next.js
export const metadata: Metadata = {
  title: "FurgoCamper | Camionetas Camperizadas de Lujo",
  description: "Descubre nuestra colección de camionetas camperizadas artesanales. Aventura, libertad y confort en cada kilómetro.",
  keywords: "camper, furgoneta, camperizada, aventura, viaje, vanlife",
  icons: {
    icon: "/favicon.svg",
  },
};

// Definimos la interfaz para las props del Layout
interface RootLayoutProps {
  children: ReactNode; // ReactNode es el tipo correcto para cualquier elemento que React pueda renderizar
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={`${kronaOne.variable} ${ibmPlexSans.variable}`}>
      <body className="min-h-dvh flex flex-col bg-[#F7E7CE] text-[#0a1e1a]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
