import { prisma } from "../../../../lib/prisma.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "../../../../lib/api-auth.js";

// Obtener un usuario por ID (sin contraseña)
export async function GET(request, context) {
  const sessionAuth = await requireAdmin();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }

  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
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

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error en GET /api/users/[id]:", error);
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 },
    );
  }
}

// Actualizar un usuario (opcionalmente la contraseña)
export async function PATCH(request, context) {
  const sessionAuth = await requireAdmin();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const updateData = { ...body };

    // Si viene una contraseña nueva, la encriptamos
    if (updateData.password) {
      updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
      delete updateData.password;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    const { passwordHash: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error en PATCH /api/users/[id]:", error);
    return NextResponse.json(
      { error: "Error al actualizar el usuario" },
      { status: 500 },
    );
  }
}

// Borrar un usuario
export async function DELETE(request, context) {
  const sessionAuth = await requireAdmin();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }

  try {
    const { id } = await context.params;

    // No permitir eliminar al propio usuario
    if (id === sessionAuth.user.id) {
      return NextResponse.json(
        { error: "No puedes eliminar tu propio usuario" },
        { status: 400 },
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error en DELETE /api/users/[id]:", error);
    return NextResponse.json(
      { error: "Error al borrar el usuario" },
      { status: 500 },
    );
  }
}
