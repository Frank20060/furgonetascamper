import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// Ruta GET para listar todos los comentarios
export async function GET() {
  try {
    // En Prisma el modelo es 'Comment', por lo tanto se usa prisma.comment
    const comments = await prisma.comment.findMany({
      include: {
        user: true, // Incluimos el usuario que comentó
        camper: true, // Incluimos la camper si existe
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error en GET /api/comments:", error);
    return NextResponse.json(
      { error: "Error al obtener los comentarios" },
      { status: 500 },
    );
  }
}

// Ruta POST para crear un nuevo comentario
export async function POST(request) {
  try {
    const body = await request.json();

    const newComment = await prisma.comment.create({
      data: body,
      include: {
        user: true,
      },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error en POST /api/comments:", error);
    return NextResponse.json(
      { error: "Error al crear el comentario" },
      { status: 500 },
    );
  }
}
