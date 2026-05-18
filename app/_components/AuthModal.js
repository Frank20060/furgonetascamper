"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const validateLoginForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "El email es requerido";
    } else if (!isValidEmail(email)) {
      newErrors.email = "El email no es válido";
    }
    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    return newErrors;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!name || name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }
    if (!email) {
      newErrors.email = "El email es requerido";
    } else if (!isValidEmail(email)) {
      newErrors.email = "El email no es válido";
    }
    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const formErrors = validateLoginForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrors({ server: "Email o contraseña incorrectos" });
      } else {
        const session = await getSession();
        const role = session?.user?.role;
        const next = (role === "ADMIN" || role === "EDITOR") ? "/admin/furgonetas" : "/";

        setSuccess("¡Sesión iniciada! Redirigiendo...");
        setTimeout(() => {
          onClose();
          router.push(next);
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      setErrors({ server: "Error al iniciar sesión. Intenta de nuevo" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const formErrors = validateRegisterForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          name: name.trim(),
        }),
      });

      if (res.ok) {
        setSuccess("¡Registro exitoso! Cambiando a login...");
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setName("");
          setMode("login");
          setSuccess("");
        }, 1500);
      } else {
        const errorData = await res.json();
        setErrors({ server: errorData.error || "Error al registrar" });
      }
    } catch (err) {
      setErrors({ server: "Error de conexión. Intenta de nuevo" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-[#102C26] px-6 py-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F7E7CE] hover:text-white text-2xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold text-[#F7E7CE]">
            {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p className="text-[#e8cfa8] text-sm mt-1">
            {mode === "login"
              ? "Accede a tu cuenta"
              : "Únete a nuestra comunidad"}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <form
            onSubmit={mode === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            {/* Nombre (solo registro) */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102C26] transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102C26] transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#102C26] transition-all ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              {mode === "register" && (
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 8 caracteres
                </p>
              )}
            </div>

            {/* Errores servidor */}
            {errors.server && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.server}
              </div>
            )}

            {/* Éxito */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#102C26] hover:bg-[#1a463d] text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Procesando..."
                : mode === "login"
                  ? "Iniciar Sesión"
                  : "Crear Cuenta"}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-3">
              {mode === "login"
                ? "¿No tienes cuenta?"
                : "¿Ya tienes cuenta?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setErrors({});
                setSuccess("");
              }}
              className="text-[#102C26] hover:text-[#1a463d] font-semibold text-sm underline transition-colors"
            >
              {mode === "login"
                ? "Crear cuenta aquí"
                : "Inicia sesión aquí"}
            </button>


            <a href="/register" className="text-[#102C26] hover:text-[#1a463d] font-semibold text-sm underline transition-colors">
              NO tienes una cuenta? Registrate
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}
