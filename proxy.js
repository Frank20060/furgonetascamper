import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Si no es ruta d'admin, no fem cap restriccio
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Sense sessio: redirigim a login
  if (!req.auth) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  // Amb sessio, validem rol
  const role = req.auth.user?.role;
  if (role !== "ADMIN" && role !== "EDITOR") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};