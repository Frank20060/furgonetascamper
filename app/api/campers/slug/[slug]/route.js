import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

// Obtener una camper por SLUG
export async function GET(request, context) {
  try {
    const { slug } = await context.params;

    const camper = await prisma.camper.findUnique({
      where: { slug },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!camper) {
      return NextResponse.json(
        { error: "Camper no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json(camper);
  } catch (error) {
    console.error("Error en GET /api/campers/slug/[slug]:", error);
    return NextResponse.json(
      { error: "Error al obtener la camper" },
      { status: 500 },
    );
  }
}
