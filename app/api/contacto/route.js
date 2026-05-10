import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// Validar email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Ruta GET para listar todas las solicitudes de contacto (SOLO ADMIN)
export async function GET() {
  try {
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

// Ruta POST para crear una nueva solicitud de contacto (PÚBLICO, VALIDADO)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validación 1: Campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: name, email, message" },
        { status: 400 }
      );
    }

    // Validación 2: Tipos de datos
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Los campos deben ser texto" },
        { status: 400 }
      );
    }

    // Validación 3: Longitud del nombre
    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
      return NextResponse.json(
        { error: "El nombre debe tener al menos 3 caracteres" },
        { status: 400 }
      );
    }
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: "El nombre no puede exceder 100 caracteres" },
        { status: 400 }
      );
    }

    // Validación 4: Email válido
    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "El email no es válido" },
        { status: 400 }
      );
    }

    // Validación 5: Longitud del mensaje
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: "El mensaje debe tener al menos 10 caracteres" },
        { status: 400 }
      );
    }
    if (trimmedMessage.length > 1000) {
      return NextResponse.json(
        { error: "El mensaje no puede exceder 1000 caracteres" },
        { status: 400 }
      );
    }

    // Validación 6: Rate limiting simple (máximo 5 contactos por email en 1 hora)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentRequests = await prisma.contactRequest.count({
      where: {
        email: trimmedEmail,
        createdAt: { gte: oneHourAgo },
      },
    });

    if (recentRequests >= 5) {
      return NextResponse.json(
        { error: "Has enviado demasiadas solicitudes. Por favor, espera una hora antes de intentar de nuevo" },
        { status: 429 }
      );
    }

    // Crear la solicitud de contacto
    const newContactRequest = await prisma.contactRequest.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      },
    });

    return NextResponse.json(newContactRequest, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/contacto:", error);
    return NextResponse.json(
      { error: "Error al crear la solicitud de contacto" },
      { status: 500 },
    );
  }
}
