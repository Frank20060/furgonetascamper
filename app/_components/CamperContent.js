"use client";

import { useState, useEffect } from "react";
import CamperCard from "./CamperCard";

export default function CamperContent({ limit = null }) {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos el fetch "a pelo" como se solicitó. 
    // Al ser un Client Component, la ruta relativa funciona perfectamente.
    fetch("/api/campers")
      .then((res) => res.json())
      .then((data) => {
        // Ordenamos por fecha descendente (más nuevos primero)
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Aplicamos el límite si existe
        setCampers(limit ? sorted.slice(0, limit) : sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar campers:", err);
        setLoading(false);
      });
  }, [limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#102C26]"></div>
      </div>
    );
  }

  if (campers.length === 0) {
    return <p className="text-center py-20 text-[#3d6158]">No se encontraron campers disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      {campers.map((c) => (
        <CamperCard key={c.id} camper={c} />
      ))}
    </div>
  );
}
