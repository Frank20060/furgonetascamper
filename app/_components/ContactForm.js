export default function ContactForm() {
  return (
    <div className="bg-[#102C26] p-10 rounded-2xl shadow-2xl border border-[#1a4a40]">
      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              className="w-full bg-[#1a4a40] border border-[#2a6a5a] text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none focus:border-[#F7E7CE] transition-colors placeholder:text-[#F7E7CE]/40"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              className="w-full bg-[#1a4a40] border border-[#2a6a5a] text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none focus:border-[#F7E7CE] transition-colors placeholder:text-[#F7E7CE]/40"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="asunto" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
            Asunto
          </label>
          <div className="relative">
            <select
              id="asunto"
              name="asunto"
              className="w-full bg-[#1a4a40] border border-[#2a6a5a] text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none focus:border-[#F7E7CE] transition-colors appearance-none"
            >
              <option value="presupuesto">Presupuesto personalizado</option>
              <option value="visita">Cita para visita</option>
              <option value="informacion">Información general</option>
              <option value="otros">Otros</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#F7E7CE] opacity-50">
              ▼
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="mensaje" className="text-xs font-semibold uppercase tracking-widest text-[#F7E7CE]">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            placeholder="¿En qué podemos ayudarte?"
            className="w-full bg-[#1a4a40] border border-[#2a6a5a] text-[#F7E7CE] px-4 py-3 rounded-lg focus:outline-none focus:border-[#F7E7CE] transition-colors placeholder:text-[#F7E7CE]/40 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#F7E7CE] text-[#102C26] font-bold py-4 rounded-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}
