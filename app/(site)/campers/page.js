import CamperContent from "../../_components/CamperContent";

export default async function CampersPage() {
  return (
    <div className="bg-[#F7E7CE] min-h-screen py-20 px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16 text-center">
          <h1 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-[#102C26] mb-4">
            Nuestras Campers
          </h1>
          <p className="text-[#3d6158] text-lg max-w-[600px] mx-auto">
            Descubre nuestra selección de furgonetas camperizadas. Cada una está
            diseñada para ofrecer el máximo confort y libertad en tus viajes.
          </p>
        </div>

        {/* Componente Client que hace el fetch directo a la API (sin límite) */}
        <CamperContent />
      </div>
    </div>
  );
}
