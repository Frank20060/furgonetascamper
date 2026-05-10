import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Validar email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validación 1: Campos requeridos
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: email, password, name" },
        { status: 400 }
      );
    }

    // Validación 2: Tipos de datos
    if (typeof email !== "string" || typeof password !== "string" || typeof name !== "string") {
      return NextResponse.json(
        { error: "Email, password y name deben ser texto" },
        { status: 400 }
      );
    }

    // Validación 3: Email válido
    const trimmedEmail = email.trim().toLowerCase();
    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "El email no es válido" },
        { status: 400 }
      );
    }

    // Validación 4: Nombre válido
    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
      return NextResponse.json(
        { error: "El nombre debe tener al menos 3 caracteres" },
        { status: 400 }
      );
    }
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: "El nombre no puede exceder 100 caracteres" },
        { status: 400 }
      );
    }

    // Validación 5: Password válido
    const trimmedPassword = password.trim();
    if (trimmedPassword.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }
    if (trimmedPassword.length > 128) {
      return NextResponse.json(
        { error: "La contraseña no puede exceder 128 caracteres" },
        { status: 400 }
      );
    }

    // Validación 6: Email no existe
    const existingUser = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email ya está registrado. Intenta con otro o inicia sesión" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(trimmedPassword, 10);

    // Crear usuario (siempre como USER role, no ADMIN/EDITOR)
    const user = await prisma.user.create({
      data: {
        email: trimmedEmail,
        name: trimmedName,
        passwordHash,
        role: "USER", // Solo usuarios normales pueden registrarse
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Registro exitoso. Ahora puedes iniciar sesión",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en POST /api/auth/register:", error);
    return NextResponse.json(
      { error: "Error al registrar el usuario" },
      { status: 500 }
    );
  }
}
