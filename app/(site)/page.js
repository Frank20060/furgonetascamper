import CamperContent from "@/app/_components/CamperContent";

export default async function Home() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hero bg-[#102C26] min-h-[520px] flex items-center relative overflow-hidden py-20 px-8">
        <div className="max-w-[1280px] w-full mx-auto relative z-[1]">
          <p className="text-xs font-semibold tracking-[.18em] uppercase text-[#e8cfa8] mb-4">
            Vanlife · Libertad · Aventura
          </p>

          <h1 className="font-heading text-[clamp(2.4rem,6vw,4.5rem)] text-[#F7E7CE] leading-[1.1] mb-5">
            Tu hogar sobre
            <br />
            <em className="not-italic text-[#e8cfa8]" style={{ opacity: 0.75 }}>
              cuatro ruedas
            </em>
          </h1>

          <p className="max-w-[520px] text-[1.05rem] text-[#c8b898] mb-9 leading-[1.7]">
            Camionetas camperizadas artesanales con todo lo que necesitas para
            recorrer el mundo sin renunciar al confort.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/campers"
              className="inline-flex items-center bg-[#F7E7CE] text-[#102C26] font-bold text-sm px-7 py-3 rounded-md transition-all duration-200 hover:bg-[#e8cfa8] hover:-translate-y-0.5"
            >
              Explorar campers
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center bg-[#1a4a40] text-[#F7E7CE] font-semibold text-sm px-7 py-3 rounded-md border border-[#2a6a5a] transition-all duration-200 hover:bg-[#235447] hover:border-[#e8cfa8] hover:-translate-y-0.5"
            >
              Pedir presupuesto
            </a>
          </div>
        </div>

        {/* Deco */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
          style={{ opacity: 0.2 }}
        >
          <img
            src="memorycatcher-camping-5099382-removebg-preview.png"
            alt="Camper"
            className="h-[60vh] w-auto max-w-none object-contain object-right transform translate-x-[10%]"
          />
        </span>
      </section>

      {/* ── CARDS ──────────────────────────────────────────────── */}
      <section className="py-20 px-8 bg-[#F7E7CE]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.4rem)] text-[#102C26] mb-2.5">
              Nuestras Campers Destacadas
            </h2>
            <p className="text-[#3d6158] text-base max-w-[480px]">
              Cada conversión es única. Fabricadas a mano con materiales
              seleccionados.
            </p>
          </div>

          {/* Componente Client que hace el fetch directo a la API con límite de 3 */}
          <CamperContent limit={4} />
          
          <div className="mt-12 text-center">
            <a href="/campers" className="text-[#102C26] font-bold border-b-2 border-[#102C26] pb-1 hover:text-[#7a4a1e] hover:border-[#7a4a1e] transition-all">
              Ver todo el catálogo →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
