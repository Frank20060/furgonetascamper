"use client";

import { useState } from "react";

export default function CommentBox({ comments = [] }) {
  // REGLA: Los comentarios raíz no tienen comentID
  const rootComments = comments.filter(c => !c.comentID);

  return (
    <section className="mt-20 space-y-12">
      <div className="flex items-center justify-between border-b-2 border-[#102C26]/10 pb-6">
        <h3 className="font-heading text-3xl text-[#102C26]">Experiencias de viajeros</h3>
        <span className="bg-[#102C26] text-[#F7E7CE] text-[0.7rem] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
          {comments.length} {comments.length === 1 ? 'Comentario' : 'Comentarios'}
        </span>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-6">
        {rootComments.length > 0 ? (
          rootComments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              allComments={comments} 
              depth={0}
            />
          ))
        ) : (
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-10 text-center border-2 border-dashed border-[#102C26]/30">
            <p className="text-[#3d6158] italic font-medium">Aún no hay comentarios. ¡Sé el primero en compartir tu aventura!</p>
          </div>
        )}
      </div>

      {/* Formulario principal */}
      <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#102C26] shadow-[0_8px_30px_rgba(16,44,38,0.05)]">
        <h4 className="font-heading text-xl text-[#102C26] mb-8 flex items-center gap-3">
          Deja tu comentario
        </h4>
        <CommentForm />
      </div>
    </section>
  );
}

function CommentItem({ comment, allComments, depth = 0 }) {
  const [isReplying, setIsReplying] = useState(false);
  
  // Buscar respuestas a este comentario específico
  const replies = allComments.filter(c => c.comentID === comment.id);
  
  const nextDepth = depth + 1;
  // Solo aplicamos margen si no es el primer nivel, para escalonar dentro del contenedor
  const containerStyle = depth > 0 ? "mt-4 ml-4 md:ml-12 border-l-2 border-[#102C26]/5 pl-4 md:pl-8" : "";

  return (
    <div className={containerStyle}>
      <div className={`bg-white rounded-2xl border border-[#102C26] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${depth > 0 ? "border-[#102C26]/30 bg-[#F7E7CE]/5" : ""}`}>
        <div className="p-5 md:p-7">
          <div className="flex gap-4 md:gap-6">
            {/* Avatar */}
            <div className={`flex-shrink-0 rounded-2xl bg-[#102C26] flex items-center justify-center text-[#F7E7CE] font-bold shadow-lg transform transition-transform ${depth > 0 ? "w-10 h-10 text-sm" : "w-14 h-14 text-xl -rotate-3"}`}>
              {comment.user?.name?.charAt(0) || "U"}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className={`font-bold text-[#102C26] ${depth > 0 ? "text-sm" : "text-lg"}`}>
                    {comment.user?.name || "Viajero Anónimo"}
                  </h5>
                  <p className="text-[0.65rem] text-[#7a9990] uppercase tracking-widest font-bold">
                    {new Date(comment.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                {depth === 0 && (
                  <div className="flex text-[#7a4a1e] bg-[#F7E7CE]/50 px-3 py-1 rounded-lg text-xs md:text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < comment.rating ? "opacity-100" : "opacity-20"}>★</span>
                    ))}
                  </div>
                )}
              </div>

              <p className={`text-[#1a3a34] leading-relaxed font-medium ${depth > 0 ? "text-[0.9rem]" : "text-[1rem]"}`}>
                {comment.text}
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => setIsReplying(!isReplying)}
                  className={`text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all flex items-center gap-2 ${
                    isReplying 
                      ? "bg-[#7a4a1e] text-white" 
                      : "text-[#102C26] hover:bg-[#F7E7CE] border border-transparent hover:border-[#102C26] "
                  }`}
                >
                  {isReplying ? (
                    <>✕ Cancelar</>
                  ) : (
                    <>↩ Responder</>
                  )}
                </button>
              </div>

              {isReplying && (
                <div className="mt-4 p-5 bg-white rounded-xl border-2 border-[#102C26]/10 animate-in fade-in slide-in-from-top-2 duration-300 shadow-inner">
                  <CommentForm isReply />
                </div>
              )}
            </div>
          </div>

          {/* Renderizado recursivo de respuestas INSIDE the parent content area but after the main comment text */}
          {replies.length > 0 && (
            <div className="mt-6 space-y-4">
              {replies.map((reply) => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  allComments={allComments} 
                  depth={nextDepth}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentForm({ isReply = false }) {
  return (
    <form className="space-y-4">
      {!isReply && (
        <div className="flex items-center gap-6 mb-2 bg-[#F7E7CE]/30 p-4 rounded-xl w-fit">
          <p className="text-sm font-bold text-[#102C26] uppercase tracking-wider">Tu valoración:</p>
          <div className="flex gap-2 text-2xl cursor-pointer text-[#7a4a1e]">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="hover:scale-125 transition-transform hover:text-[#102C26]">☆</span>
            ))}
          </div>
        </div>
      )}
      <textarea 
        placeholder={isReply ? "Escribe tu respuesta..." : "Cuéntanos tu experiencia con esta camper..."}
        className="w-full bg-white border-2 border-[#102C26] rounded-2xl p-4 text-[#102C26] font-medium placeholder:text-[#7a9990]/50 focus:outline-none focus:border-[#102C26] transition-all resize-none min-h-[100px] shadow-sm"
      ></textarea>
      <div className="flex justify-end">
        <button 
          type="button"
          className={`font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md active:translate-y-0 ${
            isReply 
              ? "bg-[#102C26] text-[#F7E7CE] text-[0.7rem] px-6 py-3" 
              : "bg-[#102C26] text-[#F7E7CE] text-[0.8rem] px-10 py-4 hover:bg-[#1a4a40] hover:-translate-y-1"
          }`}
        >
          {isReply ? "Enviar respuesta" : "Publicar comentario"}
        </button>
      </div>
    </form>
  );
}
