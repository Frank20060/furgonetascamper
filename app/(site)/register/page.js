"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";


function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Registro del usuario en la API
      const resRegister = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!resRegister.ok) {
        const data = await resRegister.json();
        setError(data.error || "Error al crear el compte");
        setLoading(false);
        return;
      }

      // 2. Login automático tras registro exitoso
      const resLogin = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (resLogin?.error) {
        setError("Compte creat, pero error en iniciar sessió. Prova d'entrar manualment.");
        setLoading(false);
        return;
      }

      // 3. Verificación de sesión y redirección
      const session = await getSession();
      const role = session?.user?.role;
      let next = searchParams.get("callbackUrl") || ((role === "ADMIN" || role === "EDITOR") ? "/admin/furgonetas" : "/");
      if (!next.startsWith("/")) next = "/";

      router.push(next);
      router.refresh();
    } catch (err) {
      setError("S'ha produït un error en el procés de registre");
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md py-12 px-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#102C26]">Registre</h1>
        <p className="text-gray-600 mt-2">Crea un nou compte</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[#102C26] bg-white p-6 shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom complet</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#102C26] focus:border-transparent outline-none transition-all"
            type="text"
            placeholder="El teu nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#102C26] focus:border-transparent outline-none transition-all"
            type="email"
            placeholder="admin@demo.local"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contrasenya</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#102C26] focus:border-transparent outline-none transition-all"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full rounded-lg bg-[#102C26] py-2.5 text-white font-semibold transition-all hover:bg-[#1a463d] focus:ring-4 focus:ring-green-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creant compte...' : 'Registrar-se'}
        </button>

        <a href="/login" className="text-[#102C26] hover:text-[#1a463d] font-semibold text-sm underline transition-colors">
          Ya tienes una cuenta? Inicia sesión aquí
        </a>

      </form>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600 animate-pulse">Carregant…</p>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}