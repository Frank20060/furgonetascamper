import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminCampersPage() {
  const campers = await prisma.camper.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Furgonetas</h1>
          <p className="text-gray-500">Listado de todas las campers disponibles en el sistema</p>
        </div>
        <Link 
          href="/admin/furgonetas/nou" 
          className="bg-[#102C26] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a463d] transition-colors shadow-sm"
        >
          + Nueva Furgoneta
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campers.map((camper) => (
              <tr key={camper.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-12 w-20 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                    {camper.imageUrl ? (
                      <Image 
                        src={camper.imageUrl} 
                        alt={camper.model} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-[10px] text-gray-400">Sin imagen</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{camper.brand} {camper.model}</div>
                  <div className="text-xs text-gray-500">{camper.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{camper.price.toLocaleString()} €</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${camper.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {camper.isAvailable ? 'Disponible' : 'No disponible'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-3">
                    <Link href={`/campers/${camper.slug}`} target="_blank" className="text-blue-600 hover:text-blue-900">Ver</Link>
                    <Link href={`/admin/furgonetas/${camper.id}/editar`} className="text-[#102C26] hover:text-[#1a463d]">Editar</Link>
                  </div>
                </td>
              </tr>
            ))}
            {campers.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">No hay furgonetas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
