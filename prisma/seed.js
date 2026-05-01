import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
import pgPkg from "pg";
const { Pool } = pgPkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.camper.createMany({
    data: [
      {
        slug: "volkswagen-california-t6",
        brand: "Volkswagen",
        model: "California T6",
        year: 2021,
        mileage: 45000,
        description: "Furgoneta camper ideal para escapadas de fin de semana. Totalmente equipada con cocina y techo elevable.",
        price: 55000,
        imageUrl: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800",
        isAvailable: true,
      },
      {
        slug: "mercedes-marco-polo-2020",
        brand: "Mercedes-Benz",
        model: "Marco Polo",
        year: 2020,
        mileage: 60000,
        description: "Lujo y confort en cada viaje. Acabados premium, calefacción estacionaria y capacidad para 4 personas.",
        price: 62000,
        imageUrl: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&q=80&w=800",
        isAvailable: true,
      },
      {
        slug: "fiat-ducato-l3h2",
        brand: "Fiat",
        model: "Ducato L3H2",
        year: 2018,
        mileage: 120000,
        description: "Gran volumen camperizada a medida. Incluye baño completo, placa solar y gran capacidad de almacenaje.",
        price: 38000,
        imageUrl: "https://images.unsplash.com/photo-1513311068232-36e5a528cc51?auto=format&fit=crop&q=80&w=800",
        isAvailable: false,
      },
      {
        slug: "ford-transit-custom-nugget",
        brand: "Ford",
        model: "Transit Custom Nugget",
        year: 2022,
        mileage: 25000,
        description: "Diseño inteligente con cocina en la parte trasera. Perfecta para 4 personas y muy manejable en ciudad.",
        price: 58500,
        imageUrl: "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?auto=format&fit=crop&q=80&w=800",
        isAvailable: true,
      },
      {
        slug: "peugeot-boxer-camper",
        brand: "Peugeot",
        model: "Boxer L2H2",
        year: 2019,
        mileage: 85000,
        description: "Camperización robusta de madera con estilo nórdico. Cama doble muy amplia y calefacción Webasto.",
        price: 42000,
        imageUrl: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800",
        isAvailable: true,
      },
      {
        slug: "renault-trafic-spaceclass",
        brand: "Renault",
        model: "Trafic SpaceClass",
        year: 2023,
        mileage: 12000,
        description: "Casi nueva. Versátil y cómoda, perfecta tanto como vehículo diario como para acampar los fines de semana.",
        price: 49000,
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
        isAvailable: true,
      }
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });