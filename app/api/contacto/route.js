import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// Ruta GET para listar todas las solicitudes de contacto
export async function GET() {
  try {
    // En Prisma el modelo es 'ContactRequest', se accede como prisma.contactRequest
    const contactRequests = await prisma.contactRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(contactRequests);
  } catch (error) {
    console.error("Error en GET /api/contacto:", error);
    return NextResponse.json(
      { error: "Error al obtener las solicitudes de contacto" },
      { status: 500 },
    );
  }
}

// Ruta POST para crear una nueva solicitud de contacto
export async function POST(request) {
  try {
    const body = await request.json();

    const newContactRequest = await prisma.contactRequest.create({
      data: body,
    });

    return NextResponse.json(newContactRequest);
  } catch (error) {
    console.error("Error en POST /api/contacto:", error);
    return NextResponse.json(
      { error: "Error al crear la solicitud de contacto" },
      { status: 500 },
    );
  }
}
