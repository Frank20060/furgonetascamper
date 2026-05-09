"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CamperForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState(initialData || {
    slug: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    description: "",
    price: "",
    imageUrl: "",
    isAvailable: true
  });

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Error en la pujada");

      const result = await res.json();
      setFormData({ ...formData, imageUrl: result.url });
    } catch (err) {
      alert("No se ha podido subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const method = initialData ? "PATCH" : "POST";
    const url = initialData 
      ? `/api/admin/furgonetas/${initialData.id}` 
      : "/api/admin/furgonetas";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error en guardar");
      }

      router.push("/admin/furgonetas");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="volkswagen-california-2023"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Marca</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Volkswagen"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Modelo</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="California"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Año</label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2023"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kilómetros</label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                placeholder="15000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio (€)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="45000"
              required
            />
          </div>
          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="isAvailable"
              className="h-4 w-4 rounded border-gray-300 text-[#102C26] focus:ring-[#102C26]"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            />
            <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
              Disponible para la venta/alquiler
            </label>
          </div>
        </div>

        {/* Media & Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              rows="5"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26] resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe la furgoneta, equipamiento, estado..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del vehículo</label>
            <div className="flex flex-col gap-4">
              {formData.imageUrl && (
                <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                  <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex items-center justify-center w-full">
                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{uploading ? 'Subiendo...' : 'Haz clic para subir'}</span>
                    </p>
                    <p className="text-xs text-gray-400">JPG, PNG o WEBP (MAX. 2MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className={`px-6 py-2 text-sm font-medium text-white bg-[#102C26] rounded-lg hover:bg-[#1a463d] transition-all shadow-sm ${loading || uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar Furgoneta' : 'Crear Furgoneta'}
        </button>
      </div>
    </form>
  );
}
