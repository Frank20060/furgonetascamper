import UserForm from "../_components/UserForm";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Usuario</h1>
        <p className="text-gray-500">Registra un nuevo usuario con acceso al panel</p>
      </div>

      <UserForm />
    </div>
  );
}
