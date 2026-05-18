import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma.js";
import { requireEditor } from "../../../../lib/api-auth.js";

export async function GET() {
  // 1) Comprovacio de sessio+rol
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }
  // 2) Consulta protegida
  const campers = await prisma.camper.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(campers);
}

export async function POST(request) {
  // 1) Comprovacio de sessio+rol
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }

  // 2) Validacio de camps basics
  const body = await request.json();
  const {
    slug,
    brand,
    model,
    description,
    price,
    imageUrl,
    year,
    mileage,
    isAvailable,
  } = body;

  if (!slug || !brand || !model || price === undefined) {
    return NextResponse.json(
      { error: "slug, brand, model y price son obligatorios" },
      { status: 400 },
    );
  }

  // 3) Insercio a BD
  try {
    const camper = await prisma.camper.create({
      data: {
        slug,
        brand,
        model,
        year: year ? parseInt(year) : null,
        mileage: mileage ? parseInt(mileage) : null,
        description: description || null,
        price: parseInt(price),
        imageUrl: imageUrl || null,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
      },
    });
    return NextResponse.json(camper, { status: 201 });
  } catch (error) {
    console.error("Error creating camper:", error);
    return NextResponse.json(
      { error: "No se ha podido crear la furgoneta" },
      { status: 400 },
    );
  }
}
