import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Obtener un usuario por ID (sin contraseña)
export async function GET(request, context) {
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
        updatedAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error en GET /api/users/[id]:", error);
    return NextResponse.json({ error: "Error al obtener el usuario" }, { status: 500 });
  }
}

// Actualizar un usuario (opcionalmente la contraseña)
export async function PATCH(request, context) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    const updateData = { ...body };

    // Si viene una contraseña nueva, la encriptamos
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error en PATCH /api/users/[id]:", error);
    return NextResponse.json({ error: "Error al actualizar el usuario" }, { status: 500 });
  }
}

// Borrar un usuario
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    
    await prisma.user.delete({ 
      where: { id } 
    });
    
    return NextResponse.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error en DELETE /api/users/[id]:", error);
    return NextResponse.json({ error: "Error al borrar el usuario" }, { status: 500 });
  }
}
