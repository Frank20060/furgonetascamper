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
  description:
    "Descubre nuestra colección de camionetas camperizadas artesanales. Aventura, libertad y confort en cada kilómetro.",
  keywords: "camper, furgoneta, camperizada, aventura, viaje, vanlife",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${kronaOne.variable} ${ibmPlexSans.variable}`}>
      <body>
        {/* ─── NAVBAR ─────────────────────────────────────────── */}
        <header className="site-header">
          <div className="header-inner">
            {/* Logo */}
            <a href="/" className="logo" aria-label="FurgoCamper inicio">
              <span className="logo-icon">⛺</span>
              <span className="logo-text">
                Furgo<em>Camper</em>
              </span>
            </a>

            {/* Nav links */}
            <nav className="main-nav" aria-label="Navegación principal">
              <a href="/" className="nav-link">Inicio</a>
              <a href="/campers" className="nav-link">Nuestras Campers</a>
              <a href="/servicios" className="nav-link">Servicios</a>
              <a href="/galeria" className="nav-link">Galería</a>
              <a href="/nosotros" className="nav-link">Nosotros</a>
              <a href="/contacto" className="nav-link nav-link--cta">
                Contáctanos
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button className="hamburger" aria-label="Abrir menú">
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        {/* ─── CONTENIDO PRINCIPAL ───────────────────────────── */}
        <main className="site-main">{children}</main>

        {/* ─── FOOTER ─────────────────────────────────────────── */}
        <footer className="site-footer">
          <div className="footer-inner">
            {/* Brand */}
            <div className="footer-brand">
              <p className="footer-logo">
                Furgo<em>Camper</em>
              </p>
              <p className="footer-tagline">
                Convierte cada viaje en una historia única.
              </p>
              <div className="footer-socials">
                <a href="#" aria-label="Instagram" className="social-link">IG</a>
                <a href="#" aria-label="Facebook" className="social-link">FB</a>
                <a href="#" aria-label="YouTube" className="social-link">YT</a>
                <a href="#" aria-label="TikTok" className="social-link">TK</a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Explorar</h4>
              <ul>
                <li><a href="/campers">Nuestras Campers</a></li>
                <li><a href="/servicios">Servicios</a></li>
                <li><a href="/galeria">Galería</a></li>
                <li><a href="/nosotros">Nosotros</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Legal</h4>
              <ul>
                <li><a href="/privacidad">Privacidad</a></li>
                <li><a href="/cookies">Cookies</a></li>
                <li><a href="/aviso-legal">Aviso Legal</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-heading">Contacto</h4>
              <ul>
                <li>📍 Barcelona, España</li>
                <li>📞 +34 600 123 456</li>
                <li>✉️ hola@furgocamper.es</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} FurgoCamper · Todos los derechos reservados</p>
          </div>
        </footer>

        {/* ─── ESTILOS ────────────────────────────────────────── */}
        <style>{`
          /* ── TOKENS ─────────────────────────────────────── */
          :root {
            --forest:         #102C26;
            --forest-light:   #1a4a40;
            --forest-dark:    #0a1e1a;
            --champagne:      #F7E7CE;
            --champagne-dark: #e8cfa8;
            --white:          #ffffff;
            --text-muted:     #a8b8b0;
            --radius:         6px;
            --transition:     0.25s ease;
          }

          /* ── RESET BASE ─────────────────────────────────── */
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body {
            font-family: var(--font-ibm), 'IBM Plex Sans', sans-serif;
            background-color: var(--champagne);
            color: var(--forest-dark);
            line-height: 1.65;
            min-height: 100dvh;
            display: flex;
            flex-direction: column;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-krona), 'Krona One', serif;
            letter-spacing: -0.02em;
            line-height: 1.15;
          }
          a { text-decoration: none; color: inherit; }
          ul { list-style: none; }
          img { display: block; max-width: 100%; }

          /* ── HEADER ─────────────────────────────────────── */
          .site-header {
            position: sticky;
            top: 0;
            z-index: 100;
            background-color: var(--forest);
            border-bottom: 1px solid var(--forest-light);
            box-shadow: 0 2px 20px rgba(0,0,0,.35);
          }
          .header-inner {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 2rem;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
          }

          /* ── LOGO ───────────────────────────────────────── */
          .logo {
            display: flex;
            align-items: center;
            gap: .55rem;
            color: var(--champagne);
            font-family: var(--font-krona), serif;
            font-size: 1.35rem;
            white-space: nowrap;
            transition: opacity var(--transition);
          }
          .logo:hover { opacity: .85; }
          .logo em { color: var(--champagne-dark); font-style: normal; }
          .logo-icon { font-size: 1.5rem; }

          /* ── NAV LINKS ──────────────────────────────────── */
          .main-nav {
            display: flex;
            align-items: center;
            gap: .25rem;
          }
          .nav-link {
            color: var(--champagne);
            font-size: .875rem;
            font-weight: 500;
            padding: .45rem .85rem;
            border-radius: var(--radius);
            transition: background var(--transition), color var(--transition);
          }
          .nav-link:hover {
            background: var(--forest-light);
          }
          .nav-link--cta {
            background: var(--champagne);
            color: var(--forest);
            font-weight: 600;
            margin-left: .5rem;
            padding: .5rem 1.1rem;
            border: 2px solid transparent;
            transition: background var(--transition), border-color var(--transition), transform var(--transition);
          }
          .nav-link--cta:hover {
            background: transparent;
            color: var(--champagne);
            border-color: var(--champagne);
            transform: translateY(-1px);
          }

          /* ── HAMBURGER ──────────────────────────────────── */
          .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: .4rem;
          }
          .hamburger span {
            display: block;
            width: 24px;
            height: 2px;
            background: var(--champagne);
            border-radius: 2px;
          }
          @media (max-width: 768px) {
            .main-nav  { display: none; }
            .hamburger { display: flex; }
          }

          /* ── MAIN ───────────────────────────────────────── */
          .site-main { flex: 1; }

          /* ── FOOTER ─────────────────────────────────────── */
          .site-footer {
            background-color: var(--forest-dark);
            color: var(--champagne);
            padding-top: 4rem;
          }
          .footer-inner {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 2rem 3rem;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1.2fr;
            gap: 3rem;
          }
          @media (max-width: 900px) {
            .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
          }
          @media (max-width: 560px) {
            .footer-inner { grid-template-columns: 1fr; }
          }

          .footer-logo {
            font-family: var(--font-krona), serif;
            font-size: 1.5rem;
            margin-bottom: .5rem;
          }
          .footer-logo em { color: var(--champagne-dark); font-style: normal; }
          .footer-tagline {
            font-size: .9rem;
            color: var(--text-muted);
            margin-bottom: 1.25rem;
          }
          .footer-socials { display: flex; gap: .6rem; }
          .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 1px solid var(--forest-light);
            font-size: .7rem;
            font-weight: 700;
            color: var(--champagne);
            background: var(--forest-light);
            transition: background var(--transition), border-color var(--transition), transform var(--transition);
          }
          .social-link:hover {
            background: var(--champagne);
            color: var(--forest);
            border-color: var(--champagne);
            transform: translateY(-2px);
          }

          .footer-heading {
            font-family: var(--font-krona), serif;
            font-size: .8rem;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--champagne-dark);
            margin-bottom: 1rem;
          }
          .footer-col ul { display: flex; flex-direction: column; gap: .55rem; }
          .footer-col ul li,
          .footer-col ul a {
            font-size: .875rem;
            color: var(--text-muted);
            transition: color var(--transition);
          }
          .footer-col ul a:hover { color: var(--champagne); }

          .footer-bottom {
            border-top: 1px solid var(--forest-light);
            padding: 1.25rem 2rem;
            text-align: center;
          }
          .footer-bottom p { font-size: .8rem; color: var(--text-muted); }
        `}</style>
      </body>
    </html>
  );
}
