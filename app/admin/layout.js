import "@/app/globals.css";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = session.user?.role;
  if (role !== "ADMIN" && role !== "EDITOR") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-[#102C26] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-gray-300 transition-colors">
              FurgonetesCamper <span className="text-sm font-normal opacity-70">Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/admin/furgonetas" className="hover:text-gray-300 transition-colors">
                Gestión de Furgonetas
              </Link>
              <Link href="/admin/usuarios" className="hover:text-gray-300 transition-colors">
                Usuarios
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs opacity-70">Sesión como</p>
              <p className="text-sm font-semibold">{session.user.email}</p>
            </div>
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer minimalista */}
      <footer className="bg-white border-t py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} FurgonetesCamper Admin Panel
      </footer>
    </div>
  );
}
