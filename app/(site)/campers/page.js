import CamperCard from "@/app/_components/CamperCard";

const campers = [
  { id: 1, nombre: "Explorer Pro", tipo: "Furgón L2H2", precio: "49.900", plazas: 2, longitud: "5,4 m", descripcion: "Totalmente equipada con cocina, cama fija y paneles solares. Perfecta para aventuras de larga duración.", badge: "Más vendida", badgeColor: "#102C26" },
  { id: 2, nombre: "Weekend Cruiser", tipo: "Furgoneta corta", precio: "34.500", plazas: 2, longitud: "4,9 m", descripcion: "Diseño compacto e inteligente. Ideal para escapadas de fin de semana con todo lo necesario a bordo.", badge: "Oferta", badgeColor: "#7a4a1e" },
  { id: 3, nombre: "Nomad XL", tipo: "Furgón L3H2", precio: "62.000", plazas: 4, longitud: "6,0 m", descripcion: "Espacio generoso para familias o grupos. Incluye ducha, inodoro y zona de almacenaje XXL.", badge: "Nuevo", badgeColor: "#1a4a40" },
  { id: 4, nombre: "Off-Road Beast", tipo: "4x4 Techo alto", precio: "78.500", plazas: 2, longitud: "5,1 m", descripcion: "Suspensión reforzada y tracción total. Llega a lugares donde otros no pueden. La aventura sin límites.", badge: null, badgeColor: null },
  { id: 5, nombre: "Urban Escape", tipo: "Furgoneta corta", precio: "29.900", plazas: 2, longitud: "4,6 m", descripcion: "El equilibrio perfecto entre ciudad y montaña. Fácil de aparcar, cómoda para dormir.", badge: null, badgeColor: null },
  { id: 6, nombre: "Luxury Road", tipo: "Furgón Premium L3", precio: "95.000", plazas: 2, longitud: "6,3 m", descripcion: "El máximo confort sobre ruedas. Materiales premium, sistema de climatización y conectividad total.", badge: "Premium", badgeColor: "#5c3d1e" },
];

export default function CampersPage() {
  return (
    <div className="bg-[#F7E7CE] min-h-screen py-20 px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16 text-center">
          <h1 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-[#102C26] mb-4">
            Nuestras Campers
          </h1>
          <p className="text-[#3d6158] text-lg max-w-[600px] mx-auto">
            Descubre nuestra selección de furgonetas camperizadas. Cada una está diseñada para ofrecer el máximo confort y libertad en tus viajes.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
          {campers.map((c) => (
            <CamperCard key={c.id} camper={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
