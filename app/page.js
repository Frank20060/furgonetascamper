const campers = [
  {
    id: 1,
    nombre: "Explorer Pro",
    tipo: "Furgón L2H2",
    precio: "49.900",
    plazas: 2,
    longitud: "5,4 m",
    descripcion: "Totalmente equipada con cocina, cama fija y paneles solares. Perfecta para aventuras de larga duración.",
    badge: "Más vendida",
    badgeColor: "#102C26",
  },
  {
    id: 2,
    nombre: "Weekend Cruiser",
    tipo: "Furgoneta corta",
    precio: "34.500",
    plazas: 2,
    longitud: "4,9 m",
    descripcion: "Diseño compacto e inteligente. Ideal para escapadas de fin de semana con todo lo necesario a bordo.",
    badge: "Oferta",
    badgeColor: "#7a4a1e",
  },
  {
    id: 3,
    nombre: "Nomad XL",
    tipo: "Furgón L3H2",
    precio: "62.000",
    plazas: 4,
    longitud: "6,0 m",
    descripcion: "Espacio generoso para familias o grupos. Incluye ducha, inodoro y zona de almacenaje XXL.",
    badge: "Nuevo",
    badgeColor: "#1a4a40",
  },
  {
    id: 4,
    nombre: "Off-Road Beast",
    tipo: "4x4 Techo alto",
    precio: "78.500",
    plazas: 2,
    longitud: "5,1 m",
    descripcion: "Suspensión reforzada y tracción total. Llega a lugares donde otros no pueden. La aventura sin límites.",
    badge: null,
    badgeColor: null,
  },
  {
    id: 5,
    nombre: "Urban Escape",
    tipo: "Furgoneta corta",
    precio: "29.900",
    plazas: 2,
    longitud: "4,6 m",
    descripcion: "El equilibrio perfecto entre ciudad y montaña. Fácil de aparcar, cómoda para dormir.",
    badge: null,
    badgeColor: null,
  },
  {
    id: 6,
    nombre: "Luxury Road",
    tipo: "Furgón Premium L3",
    precio: "95.000",
    plazas: 2,
    longitud: "6,3 m",
    descripcion: "El máximo confort sobre ruedas. Materiales premium, sistema de climatización y conectividad total.",
    badge: "Premium",
    badgeColor: "#5c3d1e",
  },
];

function IconPerson() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function IconRuler() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 6.5l-1.4-1.4L18 6.7l-1.4-1.4 1.4-1.4L16.6 2.5 12 7.1 3 16.1v2.4L5.5 21l9-9 4.6-4.6-1.5-1.4 1.4-1.4 1.5 1.5 1.5-1.5-1.5-1.5 1.5-1.5zM5.5 19L3 16.5l7-7 2.5 2.5-7 7z" />
    </svg>
  );
}

function CamperCard({ camper }) {
  return (
    <article className="camper-card">
      <div className="card-img">
        <span className="card-img-emoji">🚐</span>
        {camper.badge && (
          <span className="card-badge" style={{ backgroundColor: camper.badgeColor }}>
            {camper.badge}
          </span>
        )}
      </div>

      <div className="card-body">
        <p className="card-tipo">{camper.tipo}</p>
        <h2 className="card-nombre">{camper.nombre}</h2>
        <p className="card-desc">{camper.descripcion}</p>

        <div className="card-meta">
          <span className="card-meta-item">
            <IconPerson /> {camper.plazas} plazas
          </span>
          <span className="card-meta-item">
            <IconRuler /> {camper.longitud}
          </span>
        </div>

        <div className="card-footer">
          <p className="card-precio">
            <span className="card-precio-desde">desde</span>
            {camper.precio} €
          </p>
          <a href={`/campers/${camper.id}`} className="card-btn">
            Ver detalle →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Vanlife · Libertad · Aventura</p>
          <h1 className="hero-title">
            Tu hogar sobre<br />
            <em>cuatro ruedas</em>
          </h1>
          <p className="hero-sub">
            Camionetas camperizadas artesanales con todo lo que necesitas para
            recorrer el mundo sin renunciar al confort.
          </p>
          <div className="hero-actions">
            <a href="/campers" className="btn-primary">Explorar campers</a>
            <a href="/contacto" className="btn-ghost">Pedir presupuesto</a>
          </div>
        </div>
        <div className="hero-deco" aria-hidden="true">🏕️</div>
      </section>

      {/* ── GRID DE CARDS ────────────────────────────────────── */}
      <section className="campers-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Nuestras Campers</h2>
            <p className="section-sub">
              Cada conversión es única. Fabricadas a mano con materiales seleccionados.
            </p>
          </div>
          <div className="cards-grid">
            {campers.map((c) => (
              <CamperCard key={c.id} camper={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTILOS ──────────────────────────────────────────── */}
      <style>{`
        /* ── HERO ─────────────────────────────────────────── */
        .hero {
          background-color: #102C26;
          min-height: 520px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 5rem 2rem;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, #1a4a4040 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-inner {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          font-size: .75rem;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #e8cfa8;
          margin-bottom: 1rem;
        }
        .hero-title {
          font-family: var(--font-krona), 'Krona One', serif;
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          color: #F7E7CE;
          line-height: 1.1;
          margin-bottom: 1.25rem;
        }
        .hero-title em {
          font-style: normal;
          color: #e8cfa8;
          opacity: .75;
        }
        .hero-sub {
          max-width: 520px;
          font-size: 1.05rem;
          color: #c8b898;
          margin-bottom: 2.25rem;
          line-height: 1.7;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          background: #F7E7CE;
          color: #102C26;
          font-weight: 700;
          font-size: .9rem;
          padding: .75rem 1.75rem;
          border-radius: 6px;
          transition: background .2s, transform .2s;
        }
        .btn-primary:hover { background: #e8cfa8; transform: translateY(-2px); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          background: #1a4a40;
          color: #F7E7CE;
          font-weight: 600;
          font-size: .9rem;
          padding: .75rem 1.75rem;
          border-radius: 6px;
          border: 1.5px solid #2a6a5a;
          transition: background .2s, border-color .2s, transform .2s;
        }
        .btn-ghost:hover {
          background: #235447;
          border-color: #e8cfa8;
          transform: translateY(-2px);
        }

        .hero-deco {
          position: absolute;
          right: 8%;
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(6rem, 14vw, 12rem);
          opacity: .08;
          pointer-events: none;
          user-select: none;
        }

        /* ── CAMPERS SECTION ──────────────────────────────── */
        .campers-section { padding: 5rem 2rem; background-color: #F7E7CE; }
        .section-inner { max-width: 1280px; margin: 0 auto; }
        .section-header { margin-bottom: 3rem; }
        .section-title {
          font-family: var(--font-krona), 'Krona One', serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          color: #102C26;
          margin-bottom: .6rem;
        }
        .section-sub { color: #3d6158; font-size: 1rem; max-width: 480px; }

        /* ── GRID ─────────────────────────────────────────── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        /* ── CARD ─────────────────────────────────────────── */
        .camper-card {
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #e2d5be;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform .22s ease, box-shadow .22s ease;
        }
        .camper-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(16,44,38,.12);
        }
        .card-img {
          background: linear-gradient(135deg, #102C26 0%, #1a4a40 100%);
          height: 185px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .card-img-emoji { font-size: 4.5rem; opacity: .35; user-select: none; }
        .card-badge {
          position: absolute;
          top: .85rem;
          left: .85rem;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #F7E7CE;
          padding: .3rem .7rem;
          border-radius: 4px;
        }
        .card-body {
          padding: 1.35rem 1.4rem 1.4rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: .5rem;
        }
        .card-tipo {
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #7a9990;
        }
        .card-nombre {
          font-family: var(--font-krona), 'Krona One', serif;
          font-size: 1.15rem;
          color: #102C26;
          line-height: 1.2;
        }
        .card-desc { font-size: .855rem; color: #5a7070; line-height: 1.6; flex: 1; }
        .card-meta { display: flex; gap: 1rem; margin-top: .25rem; }
        .card-meta-item {
          display: inline-flex;
          align-items: center;
          gap: .35rem;
          font-size: .78rem;
          font-weight: 500;
          color: #7a9990;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: .75rem;
          padding-top: .85rem;
          border-top: 1px solid #ede3d0;
        }
        .card-precio {
          font-size: 1.1rem;
          font-weight: 700;
          color: #102C26;
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .card-precio-desde {
          font-size: .68rem;
          font-weight: 400;
          color: #9aaba8;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .card-btn {
          font-size: .8rem;
          font-weight: 600;
          color: #102C26;
          padding: .45rem 1rem;
          border: 1.5px solid #102C26;
          border-radius: 5px;
          transition: background .18s, color .18s;
        }
        .card-btn:hover { background: #102C26; color: #F7E7CE; }
      `}</style>
    </>
  );
}
