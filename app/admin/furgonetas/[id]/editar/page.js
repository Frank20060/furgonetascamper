import { prisma } from "../../../../lib/prisma.js";
import { notFound } from "next/navigation";
import CamperForm from "../../_components/CamperForm";
import DeleteButton from "../../_components/DeleteButton";

export default async function EditCamperPage({ params }) {
  const { id } = await params;

  const camper = await prisma.camper.findUnique({
    where: { id },
  });

  if (!camper) {
    notFound();
  }

  // Convertim camps null a "" per al formulari si cal
  const initialData = {
    ...camper,
    year: camper.year?.toString() || "",
    mileage: camper.mileage?.toString() || "",
    description: camper.description || "",
    imageUrl: camper.imageUrl || "",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Furgoneta</h1>
          <p className="text-gray-500">
            Actualiza la información técnica y comercial del vehículo
          </p>
        </div>
        <DeleteButton id={id} name={`${camper.brand} ${camper.model}`} />
      </div>

      <CamperForm initialData={initialData} />
    </div>
  );
}
