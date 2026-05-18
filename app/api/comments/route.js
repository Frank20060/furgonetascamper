import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "../../lib/api-auth.js";

// Ruta GET para listar todos los comentarios (PÚBLICO)
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        camper: { select: { id: true, slug: true, brand: true, model: true } },
      },
      orderBy: { createdAt: "desc" },
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

// Ruta POST para crear un nuevo comentario (REQUIERE AUTENTICACIÓN)
export async function POST(request) {
  try {
    // 1. Validar que el usuario esté autenticado
    const sessionAuth = await requireAuth();
    if (sessionAuth.error) {
      return NextResponse.json(
        { error: sessionAuth.error },
        { status: sessionAuth.status },
      );
    }

    // 2. Parsear y validar datos
    const body = await request.json();
    const { text, rating, camperId, parentId, userId } = body;

    // Validar que el userId coincida con el de la sesión (seguridad)
    if (userId !== sessionAuth.user.id) {
      return NextResponse.json(
        { error: "No autorizado: No puedes comentar como otro usuario" },
        { status: 403 },
      );
    }

    // Validar campos requeridos
    if (!text || !camperId) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: text y camperId" },
        { status: 400 },
      );
    }

    // Validar longitud del comentario
    if (typeof text !== "string" || text.trim().length < 10) {
      return NextResponse.json(
        { error: "El comentario debe tener al menos 10 caracteres" },
        { status: 400 },
      );
    }

    if (text.trim().length > 500) {
      return NextResponse.json(
        { error: "El comentario no puede exceder 500 caracteres" },
        { status: 400 },
      );
    }

    // Validar rating si es comentario raíz
    if (!parentId) {
      if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
        return NextResponse.json(
          { error: "La valoración debe estar entre 1 y 5" },
          { status: 400 },
        );
      }
    }

    // Verificar que la camper existe
    const camper = await prisma.camper.findUnique({ where: { id: camperId } });
    if (!camper) {
      return NextResponse.json(
        { error: "La furgoneta no existe" },
        { status: 404 },
      );
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { error: "El usuario no existe" },
        { status: 404 },
      );
    }

    // Si hay parentId, verificar que el comentario padre existe
    if (parentId) {
      const parent = await prisma.comment.findUnique({
        where: { id: parentId },
      });
      if (!parent) {
        return NextResponse.json(
          { error: "El comentario padre no existe" },
          { status: 404 },
        );
      }
    }

    // 3. Crear el comentario
    const newComment = await prisma.comment.create({
      data: {
        text: text.trim(),
        rating: rating || 0,
        camperId,
        parentId: parentId || null,
        userId,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        camper: { select: { id: true, slug: true, brand: true, model: true } },
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/comments:", error);
    return NextResponse.json(
      { error: "Error al crear el comentario" },
      { status: 500 },
    );
  }
}
