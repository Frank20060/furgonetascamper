import { prisma } from "@/lib/prisma";
import CamperDetailContent from "../../../_components/CamperDetailContent";

// Seguimos usando el ORM para generar rutas estáticas en build time (más eficiente)
export async function generateStaticParams() {
  const campers = await prisma.camper.findMany({
    select: { slug: true },
  });
  return campers.map((camper) => ({
    slug: camper.slug,
  }));
}

export default async function CamperDetailPage({ params }) {
  const { slug } = await params;

  return (
    <div className="bg-[#F7E7CE] min-h-screen py-20 px-8">
      <div className="max-w-[1280px] mx-auto">
        <a
          href="/campers"
          className="inline-flex items-center text-[#7a9990] hover:text-[#102C26] mb-8 font-semibold text-sm transition-colors"
        >
          ← Volver al catálogo
        </a>

        {/* Componente Client que hace el fetch directo a la API del detalle */}
        <CamperDetailContent slug={slug} />
      </div>
    </div>
  );
}
