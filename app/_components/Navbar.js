import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  const links = [
    ["Inicio", "/"],
    ["Nuestras Campers", "/campers"],
  ];

  if (!session) {
    links.push(["Login", "/login"]);
  } else {
    if (session.user?.role === "EDITOR" || session.user?.role === "ADMIN") {
    links.push(["Admin", "/admin/furgonetas"]);
  }
}

  return (
    <header className="sticky top-0 z-[100] bg-[#102C26] border-b border-[#1a4a40] shadow-[0_2px_20px_rgba(0,0,0,.35)]">
      <div className="max-w-[1280px] mx-auto px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Logo */}
        <a
          href="/"
          aria-label="FurgoCamper inicio"
          className="flex items-center gap-2 text-[#F7E7CE] font-heading text-[1.35rem] whitespace-nowrap transition-opacity duration-300 hover:opacity-80"
        >
          <img src="/favicon.svg" alt="Logo" className="h-8 w-auto" />
          <span>
            Furgo<em className="not-italic text-[#e8cfa8]">Camper</em>
          </span>
        </a>

        {/* Nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[#F7E7CE] text-sm font-medium px-3 py-2 rounded-md hover:bg-[#1a4a40] transition-colors duration-200"
            >
              {label}
            </a>
          ))}

          {session && (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="ml-1"
            >
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Cerrar sesión
              </button>
            </form>
          )}

          <a
            href="/contacto"
            className="ml-2 bg-[#F7E7CE] text-[#102C26] text-sm font-semibold px-4 py-2 rounded-md border-2 border-transparent transition-all duration-200 hover:bg-transparent hover:text-[#F7E7CE] hover:border-[#F7E7CE] hover:-translate-y-px"
          >
            Contáctanos
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1.5"
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-[#F7E7CE] rounded" />
          <span className="block w-6 h-0.5 bg-[#F7E7CE] rounded" />
          <span className="block w-6 h-0.5 bg-[#F7E7CE] rounded" />
        </button>
      </div>
    </header>
  );
}
