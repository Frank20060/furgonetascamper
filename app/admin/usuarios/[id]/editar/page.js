import { prisma } from "@/lib/prisma";
import UserForm from "../../_components/UserForm";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true
    }
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editar Usuario</h1>
        <p className="text-gray-500">Modifica los datos o el rol del usuario</p>
      </div>

      <UserForm initialData={user} />
    </div>
  );
}
