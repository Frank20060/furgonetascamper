export default function Footer() {
  return (
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
              <a
                key={s}
                href="#"
                aria-label={s}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#1a4a40] bg-[#1a4a40] text-[#F7E7CE] text-[.7rem] font-bold transition-all duration-200 hover:bg-[#F7E7CE] hover:text-[#102C26] hover:border-[#F7E7CE] hover:-translate-y-0.5"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Explorar */}
        <div>
          <h4 className="font-heading text-[.8rem] tracking-[.08em] uppercase text-[#e8cfa8] mb-4">Explorar</h4>
          <ul className="flex flex-col gap-2">
            {[
              ["Nuestras Campers", "/campers"],
              ["Servicios", "/servicios"],
              ["Galería", "/galeria"],
              ["Nosotros", "/nosotros"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-sm text-[#a8b8b0] hover:text-[#F7E7CE] transition-colors duration-200">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-heading text-[.8rem] tracking-[.08em] uppercase text-[#e8cfa8] mb-4">Legal</h4>
          <ul className="flex flex-col gap-2">
            {[
              ["Privacidad", "/privacidad"],
              ["Cookies", "/cookies"],
              ["Aviso Legal", "/aviso-legal"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-sm text-[#a8b8b0] hover:text-[#F7E7CE] transition-colors duration-200">
                  {l}
                </a>
              </li>
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
  );
}
