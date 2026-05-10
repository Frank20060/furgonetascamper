import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Handler para obtener el detalle de una camper por ID.
 * Cumple con la Regla #1 de Next.js 16 (await params).
 */
export async function GET(request, { params }) {
  // ✅ REGLA #1: params es una Promise en v16 y debe ser esperada.
  const { id } = await params;

  try {
    const camper = await prisma.camper.findUnique({
      where: { id: id },
      include: {
        comments: true, // Incluimos comentarios si son necesarios para la vista
      },
    });

    if (!camper) {
      return NextResponse.json({ error: "Camper no encontrada" }, { status: 404 });
    }

    return NextResponse.json(camper);
  } catch (error) {
    console.error("Error en API /api/campers/[id]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}