export default function CamperCard({ camper }) {
  return (
    <article className="bg-white rounded-[10px] border border-[#e2d5be] overflow-hidden flex flex-col transition-all duration-[220ms] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(16,44,38,.12)]">
      {/* Imagen */}
      <div
        className="h-[185px] flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg, #102C26 0%, #1a4a40 100%)" }}
      >
        <span className="text-[4.5rem] opacity-35 select-none">🚐</span>
        {camper.badge && (
          <span
            className="absolute top-3.5 left-3.5 text-[.7rem] font-bold tracking-[.06em] uppercase text-[#F7E7CE] px-3 py-1.5 rounded"
            style={{ backgroundColor: camper.badgeColor }}
          >
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
          <a
            href={`/campers/${camper.id}`}
            className="text-[.8rem] font-semibold text-[#102C26] px-4 py-[.45rem] border-[1.5px] border-[#102C26] rounded-[5px] transition-all duration-[180ms] hover:bg-[#102C26] hover:text-[#F7E7CE]"
          >
            Ver detalle →
          </a>
        </div>
      </div>
    </article>
  );
}
