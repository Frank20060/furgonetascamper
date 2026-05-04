
//Ruta get y post basicas para listar todas las camionetas y crear nuevas

import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

// Ruta GET para listar todas las camionetas
export async function GET() {
  try {
    const campers = await prisma.camper.findMany();
    return NextResponse.json(campers);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener las campers" }, { status: 500 });
  }
}

// Ruta POST para crear una nueva camioneta
export async function POST(request) {
  try {
    const body = await request.json();
    
    const newCamper = await prisma.camper.create({ 
      data: body,
      include: { 
        comments: true 
      }
    });
    
    return NextResponse.json(newCamper);
  } catch (error) {
    console.error("Error en POST /api/campers:", error);
    return NextResponse.json({ error: "Error al crear la camper" }, { status: 500 });
  }
}
