"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, name }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Estás seguro de que quieres eliminar la furgoneta "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/furgonetas/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      router.push("/admin/furgonetas");
      router.refresh();
    } catch (err) {
      alert("No se ha podido eliminar la furgoneta");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium border border-red-200 hover:bg-red-600 hover:text-white transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Eliminando...' : 'Eliminar Vehículo'}
    </button>
  );
}
