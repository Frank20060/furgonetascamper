export default function CamperCard({ camper }) {
  const formattedPrice = camper.price.toLocaleString('es-ES');
  
  return (
    <article className="bg-white rounded-[10px] border border-[#e2d5be] overflow-hidden flex flex-col transition-all duration-[220ms] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(16,44,38,.12)]">
      {/* Imagen */}
      <div className="h-[185px] flex items-center justify-center relative overflow-hidden bg-[#102C26]">
        {camper.imageUrl ? (
          <img src={camper.imageUrl} alt={`${camper.brand} ${camper.model}`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[4.5rem] opacity-35 select-none">🚐</span>
        )}
        
        {!camper.isAvailable && (
          <span className="absolute top-3.5 left-3.5 text-[.7rem] font-bold tracking-[.06em] uppercase text-[#F7E7CE] px-3 py-1.5 rounded bg-[#7a4a1e]">
            Reservada
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-[1.4rem] pt-[1.35rem] pb-[1.4rem] flex flex-col flex-1 gap-2">
        <p className="text-[.72rem] font-semibold tracking-[.1em] uppercase text-[#7a9990]">{camper.brand}</p>
        <h2 className="font-heading text-[1.15rem] text-[#102C26] leading-tight">{camper.model}</h2>
        <p className="text-[.855rem] text-[#5a7070] leading-relaxed flex-1 line-clamp-3">{camper.description}</p>

        {/* Meta */}
        <div className="flex gap-4 mt-1">
          <span className="inline-flex items-center gap-1.5 text-[.78rem] font-medium text-[#7a9990]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
            Año {camper.year}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[.78rem] font-medium text-[#7a9990]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6l5.25 3.15-.96 1.5-6.29-3.75z" />
            </svg>
            {camper.mileage?.toLocaleString('es-ES')} km
          </span>
        </div>

        {/* Footer card */}
        <div className="flex items-center justify-between mt-3 pt-3.5 border-t border-[#ede3d0]">
          <p className="flex flex-col leading-none font-bold text-[1.1rem] text-[#102C26]">
            <span className="text-[.68rem] font-normal text-[#9aaba8] uppercase tracking-[.06em] mb-0.5">precio</span>
            {formattedPrice} €
          </p>
          <a
            href={`/campers/${camper.slug}`}
            className="text-[.8rem] font-semibold text-[#102C26] px-4 py-[.45rem] border-[1.5px] border-[#102C26] rounded-[5px] transition-all duration-[180ms] hover:bg-[#102C26] hover:text-[#F7E7CE]"
          >
            Ver detalle →
          </a>
        </div>
      </div>
    </article>
  );
}
