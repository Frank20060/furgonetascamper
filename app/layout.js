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
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${kronaOne.variable} ${ibmPlexSans.variable}`}>
      <body className="min-h-dvh flex flex-col bg-[#F7E7CE] text-[#0a1e1a]">

        {/* ─── HEADER ─────────────────────────────────────────── */}
        <header className="sticky top-0 z-[100] bg-[#102C26] border-b border-[#1a4a40] shadow-[0_2px_20px_rgba(0,0,0,.35)]">
          <div className="max-w-[1280px] mx-auto px-8 h-[72px] flex items-center justify-between gap-8">

            {/* Logo */}
            <a href="/" aria-label="FurgoCamper inicio"
              className="flex items-center gap-2 text-[#F7E7CE] font-heading text-[1.35rem] whitespace-nowrap transition-opacity duration-300 hover:opacity-80">
              <span className="text-[1.5rem]">⛺</span>
              <span>Furgo<em className="not-italic text-[#e8cfa8]">Camper</em></span>
            </a>

            {/* Nav */}
            <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
              {[
                ["Inicio", "/"],
                ["Nuestras Campers", "/campers"],
                ["Servicios", "/servicios"],
                ["Galería", "/galeria"],
                ["Nosotros", "/nosotros"],
              ].map(([label, href]) => (
                <a key={href} href={href}
                  className="text-[#F7E7CE] text-sm font-medium px-3 py-2 rounded-md hover:bg-[#1a4a40] transition-colors duration-200">
                  {label}
                </a>
              ))}
              <a href="/contacto"
                className="ml-2 bg-[#F7E7CE] text-[#102C26] text-sm font-semibold px-4 py-2 rounded-md border-2 border-transparent transition-all duration-200 hover:bg-transparent hover:text-[#F7E7CE] hover:border-[#F7E7CE] hover:-translate-y-px">
                Contáctanos
              </a>
            </nav>

            {/* Hamburger */}
            <button className="flex md:hidden flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1.5" aria-label="Abrir menú">
              <span className="block w-6 h-0.5 bg-[#F7E7CE] rounded" />
              <span className="block w-6 h-0.5 bg-[#F7E7CE] rounded" />
              <span className="block w-6 h-0.5 bg-[#F7E7CE] rounded" />
            </button>
          </div>
        </header>

        {/* ─── MAIN ───────────────────────────────────────────── */}
        <main className="flex-1">{children}</main>

        {/* ─── FOOTER ─────────────────────────────────────────── */}
        <footer className="bg-[#0a1e1a] text-[#F7E7CE] pt-16">
          <div className="max-w-[1280px] mx-auto px-8 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10">

            {/* Brand */}
            <div>
              <p className="font-heading text-2xl mb-2 text-[#F7E7CE]">
                Furgo<em className="not-italic text-[#e8cfa8]">Camper</em>
              </p>
              <p className="text-sm text-[#a8b8b0] mb-5">Convierte cada viaje en una historia única.</p>
              <div className="flex gap-2">
                {["IG", "FB", "YT", "TK"].map((s) => (
                  <a key={s} href="#" aria-label={s}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#1a4a40] bg-[#1a4a40] text-[#F7E7CE] text-[.7rem] font-bold transition-all duration-200 hover:bg-[#F7E7CE] hover:text-[#102C26] hover:border-[#F7E7CE] hover:-translate-y-0.5">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Explorar */}
            <div>
              <h4 className="font-heading text-[.8rem] tracking-[.08em] uppercase text-[#e8cfa8] mb-4">Explorar</h4>
              <ul className="flex flex-col gap-2">
                {[["Nuestras Campers", "/campers"], ["Servicios", "/servicios"], ["Galería", "/galeria"], ["Nosotros", "/nosotros"]].map(([l, h]) => (
                  <li key={h}><a href={h} className="text-sm text-[#a8b8b0] hover:text-[#F7E7CE] transition-colors duration-200">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-heading text-[.8rem] tracking-[.08em] uppercase text-[#e8cfa8] mb-4">Legal</h4>
              <ul className="flex flex-col gap-2">
                {[["Privacidad", "/privacidad"], ["Cookies", "/cookies"], ["Aviso Legal", "/aviso-legal"]].map(([l, h]) => (
                  <li key={h}><a href={h} className="text-sm text-[#a8b8b0] hover:text-[#F7E7CE] transition-colors duration-200">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-heading text-[.8rem] tracking-[.08em] uppercase text-[#e8cfa8] mb-4">Contacto</h4>
              <ul className="flex flex-col gap-2 text-sm text-[#a8b8b0]">
                <li>📍 Barcelona, España</li>
                <li>📞 +34 600 123 456</li>
                <li>✉️ hola@furgocamper.es</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1a4a40] px-8 py-5 text-center">
            <p className="text-[.8rem] text-[#a8b8b0]">
              © {new Date().getFullYear()} FurgoCamper · Todos los derechos reservados
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
