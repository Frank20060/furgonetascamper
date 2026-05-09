"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(initialData || {
    email: "",
    name: "",
    role: "USER",
    password: "" // Solo para nuevos usuarios
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const method = initialData ? "PATCH" : "POST";
    const url = initialData 
      ? `/api/users/${initialData.id}` 
      : "/api/users";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error al guardar");
      }

      router.push("/admin/usuarios");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="usuari@exemple.com"
            required
            disabled={!!initialData}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <select
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="EDITOR">EDITOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        {!initialData && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#102C26]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        )}
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
        {initialData && (
          <div className="flex-1">
             <button
              type="button"
              onClick={async () => {
                if(confirm(`¿Eliminar al usuario ${initialData.email}?`)) {
                  setLoading(true);
                  await fetch(`/api/users/${initialData.id}`, { method: "DELETE" });
                  router.push("/admin/usuarios");
                  router.refresh();
                }
              }}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Eliminar Usuario
            </button>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-sm font-medium text-white bg-[#102C26] rounded-lg hover:bg-[#1a463d] transition-all shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
}
