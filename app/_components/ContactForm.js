"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errors, setErrors] = useState({}); // Errores de validación

  // Validar email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validar campos
  const validateForm = (formData) => {
    const newErrors = {};
    
    const nombre = formData.get("nombre")?.trim();
    const email = formData.get("email")?.trim();
    const asunto = formData.get("asunto");
    const mensaje = formData.get("mensaje")?.trim();

    if (!nombre) {
      newErrors.nombre = "El nombre es requerido";
    } else if (nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (nombre.length > 100) {
      newErrors.nombre = "El nombre no puede exceder 100 caracteres";
    }

    if (!email) {
      newErrors.email = "El email es requerido";
    } else if (!isValidEmail(email)) {
      newErrors.email = "El email no es válido";
    }

    if (!asunto) {
      newErrors.asunto = "Selecciona un asunto";
    }

    if (!mensaje) {
      newErrors.mensaje = "El mensaje es requerido";
    } else if (mensaje.length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres";
    } else if (mensaje.length > 1000) {
      newErrors.mensaje = "El mensaje no puede exceder 1000 caracteres";
    }

    return newErrors;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setStatus("loading");

    const formData = new FormData(e.target);
    
    // Validar cliente
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("error");
      return;
    }

    const data = {
      name: formData.get("nombre").trim(),
      email: formData.get("email").trim(),
      message: `${formData.get("asunto")}: ${formData.get("mensaje").trim()}`,
    };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
        // Limpiar success después de 5 segundos
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorData = await res.json();
        setErrors({ server: errorData.error || "Error al enviar el mensaje" });
        setStatus("error");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setErrors({ server: "Error de conexión. Intenta de nuevo" });
      setStatus("error");
    }
  }

  return (
    <div className="bg-[#102C26] p-10 rounded-2xl shadow-2xl border border-[#1a4a40]">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              className={`w-full bg-[#1a4a40] border text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none transition-colors placeholder:text-[#F7E7CE]/40 ${
                errors.nombre ? "border-red-500" : "border-[#2a6a5a] focus:border-[#F7E7CE]"
              }`}
            />
            {errors.nombre && <p className="text-red-400 text-xs">{errors.nombre}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              className={`w-full bg-[#1a4a40] border text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none transition-colors placeholder:text-[#F7E7CE]/40 ${
                errors.email ? "border-red-500" : "border-[#2a6a5a] focus:border-[#F7E7CE]"
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="asunto" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
            Asunto
          </label>
          <div className="relative">
            <select
              id="asunto"
              name="asunto"
              className={`w-full bg-[#1a4a40] border text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none transition-colors appearance-none ${
                errors.asunto ? "border-red-500" : "border-[#2a6a5a] focus:border-[#F7E7CE]"
              }`}
            >
              <option value="">Selecciona un asunto</option>
              <option value="presupuesto">Presupuesto personalizado</option>
              <option value="visita">Cita para visita</option>
              <option value="informacion">Información general</option>
              <option value="otros">Otros</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#F7E7CE] opacity-50">
              ▼
            </div>
          </div>
          {errors.asunto && <p className="text-red-400 text-xs">{errors.asunto}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="mensaje" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            placeholder="¿En qué podemos ayudarte?"
            className={`w-full bg-[#1a4a40] border text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none transition-colors placeholder:text-[#F7E7CE]/40 resize-none ${
              errors.mensaje ? "border-red-500" : "border-[#2a6a5a] focus:border-[#F7E7CE]"
            }`}
          ></textarea>
          {errors.mensaje && <p className="text-red-400 text-xs">{errors.mensaje}</p>}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#F7E7CE] text-[#102C26] font-bold py-4 rounded-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Enviar mensaje"}
        </button>

        {status === "success" && (
          <p className="text-[#F7E7CE] text-sm text-center font-medium bg-green-900/30 border border-green-600/50 p-3 rounded-lg">
            ✓ Mensaje enviado correctamente. ¡Nos vemos pronto!
          </p>
        )}
        {status === "error" && (
          <div className="bg-red-900/30 border border-red-600/50 p-3 rounded-lg">
            {errors.server && (
              <p className="text-red-400 text-sm text-center font-medium">
                ✕ {errors.server}
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
