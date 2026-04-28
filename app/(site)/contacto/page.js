import ContactForm from "@/app/_components/ContactForm";

export default function ContactoPage() {
  return (
    <div className="bg-[#F7E7CE] min-h-screen py-20 px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <h1 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-[#102C26] mb-6 leading-tight">
                Hablemos de tu <br />
                <span className="text-[#8b6d4d]">próxima aventura</span>
              </h1>
              <p className="text-[#1a3a34] text-lg leading-relaxed">
                ¿Tienes dudas sobre nuestras furgonetas o quieres un presupuesto personalizado? 
                Estamos aquí para ayudarte a dar el primer paso hacia la libertad sobre ruedas.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <h4 className="font-heading text-sm uppercase tracking-wider text-[#102C26] font-bold">Ubicación</h4>
                  <p className="text-[#1a3a34]">Calle de la Aventura, 123, 08001 Barcelona</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <h4 className="font-heading text-sm uppercase tracking-wider text-[#102C26] font-bold">Teléfono</h4>
                  <p className="text-[#1a3a34]">+34 600 123 456</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <h4 className="font-heading text-sm uppercase tracking-wider text-[#102C26] font-bold">Email</h4>
                  <p className="text-[#1a3a34]">hola@furgocamper.es</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <ContactForm />

        </div>
      </div>
    </div>
  );
}
