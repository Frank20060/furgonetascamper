import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import CommentBox from "@/app/_components/CommentBox";

// Generación de rutas estáticas en build-time (recomendado para performance)
export async function generateStaticParams() {
  const campers = await prisma.camper.findMany({
    select: { slug: true },
  });
  return campers.map((camper) => ({
    slug: camper.slug,
  }));
}

export default async function CamperDetailPage({ params }) {
  // REGLA CRÍTICA V16: await params
  const { slug } = await params;

  const camper = await prisma.camper.findUnique({
    where: { slug },
    include: {
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!camper) {
    notFound();
  }

  const formattedPrice = camper.price.toLocaleString("es-ES");

  return (
    <div className="bg-[#F7E7CE] min-h-screen py-20 px-8">
      <div className="max-w-[1280px] mx-auto">
        <a
          href="/campers"
          className="inline-flex items-center text-[#7a9990] hover:text-[#102C26] mb-8 font-semibold text-sm transition-colors"
        >
          ← Volver al catálogo
        </a>

        <div className="bg-white rounded-[20px] overflow-hidden border border-[#e2d5be] shadow-[0_20px_40px_rgba(16,44,38,.08)] flex flex-col md:flex-row">
          {/* LADO IZQUIERDO: Imagen */}
          <div className="md:w-1/2 min-h-[400px] md:min-h-[600px] relative bg-[#102C26] flex items-center justify-center">
            {camper.imageUrl ? (
              <img
                src={camper.imageUrl}
                alt={`${camper.brand} ${camper.model}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <span className="text-[8rem] opacity-35 select-none">🚐</span>
            )}

            {!camper.isAvailable && (
              <div className="absolute top-6 left-6 bg-[#7a4a1e] text-[#F7E7CE] px-4 py-2 rounded-md font-bold tracking-[.1em] uppercase text-xs shadow-lg">
                Reservada
              </div>
            )}
          </div>

          {/* LADO DERECHO: Info */}
          <div className="md:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
            <span className="text-[#7a9990] uppercase tracking-[.15em] font-bold text-sm mb-3">
              {camper.brand}
            </span>
            <h1 className="font-heading text-[clamp(2.2rem,4vw,3.5rem)] text-[#102C26] leading-tight mb-6">
              {camper.model}
            </h1>

            <p className="text-[#5a7070] text-[1.1rem] leading-relaxed mb-10 flex-1">
              {camper.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10 pb-10 border-b border-[#ede3d0]">
              <div>
                <p className="text-[#9aaba8] text-[.75rem] uppercase tracking-wider font-bold mb-1">
                  Año
                </p>
                <p className="text-[#102C26] font-medium text-xl">
                  {camper.year}
                </p>
              </div>
              <div>
                <p className="text-[#9aaba8] text-[.75rem] uppercase tracking-wider font-bold mb-1">
                  Kilometraje
                </p>
                <p className="text-[#102C26] font-medium text-xl">
                  {camper.mileage?.toLocaleString("es-ES")} km
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-[#9aaba8] text-[.75rem] uppercase tracking-wider font-bold mb-1">
                  Precio total
                </p>
                <p className="text-[#102C26] font-bold text-[2.5rem] leading-none">
                  {formattedPrice} €
                </p>
              </div>

              <a
                href="/contacto"
                className="inline-flex justify-center items-center bg-[#102C26] text-[#F7E7CE] font-bold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:bg-[#1a4a40] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,44,38,.15)]"
              >
                Pedir Presupuesto
              </a>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE COMENTARIOS */}
        <CommentBox comments={camper.comments} />
      </div>
    </div>
  );
}
