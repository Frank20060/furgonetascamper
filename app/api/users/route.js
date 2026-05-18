import { prisma } from "../../../lib/prisma.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "../../../lib/api-auth.js";

// Ruta GET para listar todos los usuarios (sin contraseñas)
export async function GET() {
  const sessionAuth = await requireAdmin();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        profileImg: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error en GET /api/users:", error);
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 },
    );
  }
}

// Ruta POST para crear un nuevo usuario con encriptación
export async function POST(request) {
  const sessionAuth = await requireAdmin();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }

  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y password son obligatorios" },
        { status: 400 },
      );
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        role,
      },
    });

    // No devolver la contraseña en la respuesta
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error en POST /api/users:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Error al crear el usuario" },
      { status: 500 },
    );
  }
}
