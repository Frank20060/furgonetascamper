
//Rutas get, patch y delete basicas para listar, actualizar y borrar las camionetas por id

import { prisma } from "../../../../src/lib/prisma";
import { NextResponse } from "next/server";

// Obtener una camper por ID
export async function GET(request, context) {
  try {
    const { id } = await context.params; // Next.js 16 requiere await en params
    
    const camper = await prisma.camper.findUnique({
      where: { id } // id es String (cuid)
    });

    if (!camper) {
      return NextResponse.json({ error: "Camper no encontrada" }, { status: 404 });
    }

    return NextResponse.json(camper);
  } catch (error) {
    console.error("Error en GET /api/campers/[id]:", error);
    return NextResponse.json({ error: "Error al obtener la camper" }, { status: 500 });
  }
}

// Actualizar una camper
export async function PATCH(request, context) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updatedCamper = await prisma.camper.update({
      where: { id },
      data: body
    });

    return NextResponse.json(updatedCamper);
  } catch (error) {
    console.error("Error en PATCH /api/campers/[id]:", error);
    return NextResponse.json({ error: "Error al actualizar la camper" }, { status: 500 });
  }
}

// Borrar una camper
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    
    await prisma.camper.delete({ 
      where: { id } 
    });
    
    return NextResponse.json({ success: true, message: "Camper eliminada correctamente" });
  } catch (error) {
    console.error("Error en DELETE /api/campers/[id]:", error);
    return NextResponse.json({ error: "Error al borrar la camper" }, { status: 500 });
  }
}
