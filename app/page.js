const campers = [
  { id: 1, nombre: "Explorer Pro", tipo: "Furgón L2H2", precio: "49.900", plazas: 2, longitud: "5,4 m", descripcion: "Totalmente equipada con cocina, cama fija y paneles solares. Perfecta para aventuras de larga duración.", badge: "Más vendida", badgeColor: "#102C26" },
  { id: 2, nombre: "Weekend Cruiser", tipo: "Furgoneta corta", precio: "34.500", plazas: 2, longitud: "4,9 m", descripcion: "Diseño compacto e inteligente. Ideal para escapadas de fin de semana con todo lo necesario a bordo.", badge: "Oferta", badgeColor: "#7a4a1e" },
  { id: 3, nombre: "Nomad XL", tipo: "Furgón L3H2", precio: "62.000", plazas: 4, longitud: "6,0 m", descripcion: "Espacio generoso para familias o grupos. Incluye ducha, inodoro y zona de almacenaje XXL.", badge: "Nuevo", badgeColor: "#1a4a40" },
  { id: 4, nombre: "Off-Road Beast", tipo: "4x4 Techo alto", precio: "78.500", plazas: 2, longitud: "5,1 m", descripcion: "Suspensión reforzada y tracción total. Llega a lugares donde otros no pueden. La aventura sin límites.", badge: null, badgeColor: null },
  { id: 5, nombre: "Urban Escape", tipo: "Furgoneta corta", precio: "29.900", plazas: 2, longitud: "4,6 m", descripcion: "El equilibrio perfecto entre ciudad y montaña. Fácil de aparcar, cómoda para dormir.", badge: null, badgeColor: null },
  { id: 6, nombre: "Luxury Road", tipo: "Furgón Premium L3", precio: "95.000", plazas: 2, longitud: "6,3 m", descripcion: "El máximo confort sobre ruedas. Materiales premium, sistema de climatización y conectividad total.", badge: "Premium", badgeColor: "#5c3d1e" },
];

function CamperCard({ camper }) {
  return (
    <article className="bg-white rounded-[10px] border border-[#e2d5be] overflow-hidden flex flex-col transition-all duration-[220ms] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(16,44,38,.12)]">

      {/* Imagen */}
      <div className="h-[185px] flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg, #102C26 0%, #1a4a40 100%)" }}>
        <span className="text-[4.5rem] opacity-35 select-none">🚐</span>
        {camper.badge && (
          <span className="absolute top-3.5 left-3.5 text-[.7rem] font-bold tracking-[.06em] uppercase text-[#F7E7CE] px-3 py-1.5 rounded"
            style={{ backgroundColor: camper.badgeColor }}>
            {camper.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-[1.4rem] pt-[1.35rem] pb-[1.4rem] flex flex-col flex-1 gap-2">
        <p className="text-[.72rem] font-semibold tracking-[.1em] uppercase text-[#7a9990]">{camper.tipo}</p>
        <h2 className="font-heading text-[1.15rem] text-[#102C26] leading-tight">{camper.nombre}</h2>
        <p className="text-[.855rem] text-[#5a7070] leading-relaxed flex-1">{camper.descripcion}</p>

        {/* Meta */}
        <div className="flex gap-4 mt-1">
          <span className="inline-flex items-center gap-1.5 text-[.78rem] font-medium text-[#7a9990]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            {camper.plazas} plazas
          </span>
          <span className="inline-flex items-center gap-1.5 text-[.78rem] font-medium text-[#7a9990]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 6.5l-1.4-1.4L18 6.7l-1.4-1.4 1.4-1.4L16.6 2.5 12 7.1 3 16.1v2.4L5.5 21l9-9 4.6-4.6-1.5-1.4 1.4-1.4 1.5 1.5 1.5-1.5-1.5-1.5 1.5-1.5zM5.5 19L3 16.5l7-7 2.5 2.5-7 7z" />
            </svg>
            {camper.longitud}
          </span>
        </div>

        {/* Footer card */}
        <div className="flex items-center justify-between mt-3 pt-3.5 border-t border-[#ede3d0]">
          <p className="flex flex-col leading-none font-bold text-[1.1rem] text-[#102C26]">
            <span className="text-[.68rem] font-normal text-[#9aaba8] uppercase tracking-[.06em] mb-0.5">desde</span>
            {camper.precio} €
          </p>
          <a href={`/campers/${camper.id}`}
            className="text-[.8rem] font-semibold text-[#102C26] px-4 py-[.45rem] border-[1.5px] border-[#102C26] rounded-[5px] transition-all duration-[180ms] hover:bg-[#102C26] hover:text-[#F7E7CE]">
            Ver detalle →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hero bg-[#102C26] min-h-[520px] flex items-center relative overflow-hidden py-20 px-8">
        <div className="max-w-[1280px] w-full mx-auto relative z-[1]">

          <p className="text-xs font-semibold tracking-[.18em] uppercase text-[#e8cfa8] mb-4">
            Vanlife · Libertad · Aventura
          </p>

          <h1 className="font-heading text-[clamp(2.4rem,6vw,4.5rem)] text-[#F7E7CE] leading-[1.1] mb-5">
            Tu hogar sobre<br />
            <em className="not-italic text-[#e8cfa8]" style={{ opacity: .75 }}>cuatro ruedas</em>
          </h1>

          <p className="max-w-[520px] text-[1.05rem] text-[#c8b898] mb-9 leading-[1.7]">
            Camionetas camperizadas artesanales con todo lo que necesitas para
            recorrer el mundo sin renunciar al confort.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a href="/campers"
              className="inline-flex items-center bg-[#F7E7CE] text-[#102C26] font-bold text-sm px-7 py-3 rounded-md transition-all duration-200 hover:bg-[#e8cfa8] hover:-translate-y-0.5">
              Explorar campers
            </a>
            <a href="/contacto"
              className="inline-flex items-center bg-[#1a4a40] text-[#F7E7CE] font-semibold text-sm px-7 py-3 rounded-md border border-[#2a6a5a] transition-all duration-200 hover:bg-[#235447] hover:border-[#e8cfa8] hover:-translate-y-0.5">
              Pedir presupuesto
            </a>
          </div>
        </div>

        {/* Deco */}
        <span aria-hidden="true"
          className="absolute right-[8%] top-1/2 -translate-y-1/2 text-[clamp(6rem,14vw,12rem)] pointer-events-none select-none"
          style={{ opacity: .08 }}>
          🏕️
        </span>
      </section>

      {/* ── CARDS ──────────────────────────────────────────────── */}
      <section className="py-20 px-8 bg-[#F7E7CE]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.4rem)] text-[#102C26] mb-2.5">
              Nuestras Campers
            </h2>
            <p className="text-[#3d6158] text-base max-w-[480px]">
              Cada conversión es única. Fabricadas a mano con materiales seleccionados.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {campers.map((c) => <CamperCard key={c.id} camper={c} />)}
          </div>
        </div>
      </section>
    </>
  );
}
