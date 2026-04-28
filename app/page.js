import CamperCard from "@/app/_components/CamperCard";

const campers = [
  { id: 1, nombre: "Explorer Pro", tipo: "Furgón L2H2", precio: "49.900", plazas: 2, longitud: "5,4 m", descripcion: "Totalmente equipada con cocina, cama fija y paneles solares. Perfecta para aventuras de larga duración.", badge: "Más vendida", badgeColor: "#102C26" },
  { id: 2, nombre: "Weekend Cruiser", tipo: "Furgoneta corta", precio: "34.500", plazas: 2, longitud: "4,9 m", descripcion: "Diseño compacto e inteligente. Ideal para escapadas de fin de semana con todo lo necesario a bordo.", badge: "Oferta", badgeColor: "#7a4a1e" },
  { id: 3, nombre: "Nomad XL", tipo: "Furgón L3H2", precio: "62.000", plazas: 4, longitud: "6,0 m", descripcion: "Espacio generoso para familias o grupos. Incluye ducha, inodoro y zona de almacenaje XXL.", badge: "Nuevo", badgeColor: "#1a4a40" },
  { id: 4, nombre: "Off-Road Beast", tipo: "4x4 Techo alto", precio: "78.500", plazas: 2, longitud: "5,1 m", descripcion: "Suspensión reforzada y tracción total. Llega a lugares donde otros no pueden. La aventura sin límites.", badge: null, badgeColor: null },
  { id: 5, nombre: "Urban Escape", tipo: "Furgoneta corta", precio: "29.900", plazas: 2, longitud: "4,6 m", descripcion: "El equilibrio perfecto entre ciudad y montaña. Fácil de aparcar, cómoda para dormir.", badge: null, badgeColor: null },
  { id: 6, nombre: "Luxury Road", tipo: "Furgón Premium L3", precio: "95.000", plazas: 2, longitud: "6,3 m", descripcion: "El máximo confort sobre ruedas. Materiales premium, sistema de climatización y conectividad total.", badge: "Premium", badgeColor: "#5c3d1e" },
];

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
