import CamperForm from "../_components/CamperForm";

export default function NewCamperPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nueva Furgoneta</h1>
        <p className="text-gray-500">Añade un nuevo vehículo al catálogo público</p>
      </div>
      
      <CamperForm />
    </div>
  );
}
