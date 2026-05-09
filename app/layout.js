import { Krona_One, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "FurgoCamper | Camionetas Camperizadas de Lujo",
  description: "Descubre nuestra colección de camionetas camperizadas artesanales. Aventura, libertad y confort en cada kilómetro.",
  keywords: "camper, furgoneta, camperizada, aventura, viaje, vanlife",
  icons: {
    icon: "/favicon.svg",
  },
};

import Providers from "@/app/providers";

export default function RootLayout({ children }) {
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
