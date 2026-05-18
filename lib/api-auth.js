import { auth } from "../auth.js";

export async function requireAuth() {
  // Cualquier usuario autenticado
  const session = await auth();
  if (!session?.user) {
    return { error: "No autorizado: inicia sesión para comentar", status: 401 };
  }
  return { user: session.user };
}

export async function requireEditor() {
  // Función común: evita repetir la misma lógica en todas las APIs
  const session = await auth();
  if (!session?.user) {
    return { error: "No autorizado", status: 401 };
  }
  const role = session.user.role;
  if (role !== "ADMIN" && role !== "EDITOR") {
    return { error: "Prohibido", status: 403 };
  }
  return { user: session.user };
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { error: "No autorizado", status: 401 };
  }
  if (session.user.role !== "ADMIN") {
    return { error: "Prohibido: Solo para Administradores", status: 403 };
  }
  return { user: session.user };
}
