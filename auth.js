import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // En local evita errors d'host quan no hi ha AUTH_URL definida
  trustHost: true,
  // Redireccio de login personalitzada
  pages: { signIn: "/login" },
  // Sessio basada en JWT (sense taula de sessions)
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contrasenya", type: "password" },
      },
      authorize: async (credentials) => {
        // 1) Validacio minima de dades d'entrada
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email).trim();
        // 2) Busquem l'usuari a BD
        const user = await prisma.user.findUnique({ where: { email } });
        // 3) Comparem password en text pla amb hash guardat
        if (!user || !bcrypt.compareSync(String(credentials.password), user.passwordHash)) {
          return null;
        }
        // 4) Retornem la informacio que viatjara al token/sessio
        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // Quan hi ha login, copiem id/role cap al token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      // Exposem id/role al client via session.user
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});