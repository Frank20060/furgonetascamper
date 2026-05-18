"use client";

import { Suspense, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Cridem al provider credentials d'Auth.js
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Si falla login, mostrem missatge
      if (res?.error) {
        setError("Credencials incorrectes");
        setLoading(false);
        return;
      }

      // Obtenim la sessió per verificar el rol de l'usuari
      const session = await getSession();
      const role = (session?.user as { role?: string })?.role;

      // Si hi ha callbackUrl la respectem, si no, decidim segons el rol
      let next = searchParams.get("callbackUrl");
      if (!next) {
        next = (role === "ADMIN" || role === "EDITOR") ? "/admin/furgonetas" : "/";
      }
      if (!next.startsWith("/")) next = "/";

      router.push(next);
      router.refresh();
    } catch (err) {
      setError("S'ha produït un error en iniciar la sessió");
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md py-12 px-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#102C26]">Inici de sessió</h1>
        <p className="text-gray-600 mt-2">Accede a tu cuenta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[#102C26] bg-white p-6 shadow-lg">
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
          {loading ? 'Entrant...' : 'Entrar'}
        </button>

        <a href="/register" className="text-[#102C26] hover:text-[#1a463d] font-semibold text-sm underline transition-colors">
          NO tienes una cuenta? Registrate
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
      <LoginForm />
    </Suspense>
  );
}
