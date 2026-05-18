import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireEditor } from "../../../../lib/api-auth.js";

// Llista blanca de tipus d'imatge per evitar pujades arbitraries
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB (demo)

export async function POST(request) {
  // 1) Nomes usuaris autoritzats poden pujar fitxers
  const sessionAuth = await requireEditor();
  if (sessionAuth.error) {
    return NextResponse.json(
      { error: sessionAuth.error },
      { status: sessionAuth.status },
    );
  }

  // 2) Llegim form-data i validem que hi ha fitxer
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string" || !file.name) {
    return NextResponse.json({ error: "Fitxer no vàlid" }, { status: 400 });
  }

  // 3) Validem tipus MIME
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Tipus no permès" }, { status: 400 });
  }

  // 4) Validem mida maxima
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: "Fitxer massa gran" }, { status: 400 });
  }

  // 5) Guardem amb nom unic a public/uploads/furgonetas
  const ext = path.extname(file.name).slice(0, 10) || ".bin";
  const name = `${randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "furgonetas");

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), buf);

    // 6) Retornem URL publica per guardar-la a la BD
    const url = `/uploads/furgonetas/${name}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "No s'ha pogut guardar el fitxer" },
      { status: 500 },
    );
  }
}
