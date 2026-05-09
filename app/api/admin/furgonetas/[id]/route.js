import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireEditor } from "@/lib/api-auth";

export async function GET(request, context) {
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json({ error: sessionAuth.error }, { status: sessionAuth.status });
  }
  const { id } = await context.params;
  const camper = await prisma.camper.findUnique({ where: { id } });
  if (!camper) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(camper);
}

export async function PATCH(request, context) {
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json({ error: sessionAuth.error }, { status: sessionAuth.status });
  }
  const { id } = await context.params;
  const body = await request.json();

  try {
    const camper = await prisma.camper.update({
      where: { id },
      data: {
        slug: body.slug,
        brand: body.brand,
        model: body.model,
        year: body.year ? parseInt(body.year) : undefined,
        mileage: body.mileage ? parseInt(body.mileage) : undefined,
        description: body.description,
        price: body.price ? parseInt(body.price) : undefined,
        imageUrl: body.imageUrl,
        isAvailable: body.isAvailable,
      },
    });
    return NextResponse.json(camper);
  } catch (error) {
    console.error("Error updating camper:", error);
    return NextResponse.json({ error: "No se ha podido actualizar" }, { status: 400 });
  }
}

export async function DELETE(request, context) {
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json({ error: sessionAuth.error }, { status: sessionAuth.status });
  }
  const { id } = await context.params;
  try {
    await prisma.camper.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting camper:", error);
    return NextResponse.json({ error: "No se ha podido eliminar" }, { status: 400 });
  }
}
