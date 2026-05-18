import "dotenv/config";
import { prisma } from "./lib/prisma.js";

async function main() {
  try {
    console.log("Intentando conectar a la base de datos con:", process.env.DATABASE_URL);
    const campers = await prisma.camper.findMany();
    console.log("¡Conexión exitosa! Campers encontrados:", campers.length);
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
