import { gsap } from "gsap";

/**
 * FAQ por categorías (diseño de la imagen de referencia, fondo blanco):
 *  - Izquierda: lista de categorías (icono + título + descripción). La activa
 *    se resalta.
 *  - Derecha: acordeón con las preguntas de la categoría activa (una abierta).
 *  - Animaciones: cambio de categoría con stagger, acordeón con transición
 *    suave (grid-rows), reveal al entrar en viewport. Respeta reduced-motion.
 *
 * Contenido: las 3 preguntas marcadas [código] son verbatim del sitio actual;
 * las demás se redactaron con datos reales de la marca (revisables).
 */
const ICONS = {
  ticket:
    '<rect x="3" y="6.5" width="18" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.2 6.5v11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="1.8 2.2"/>',
  mountain:
    '<path d="M3 19l6-10 4 6 2-3 6 7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  backpack:
    '<path d="M8 9V7a4 4 0 018 0v2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="5" y="9" width="14" height="12" rx="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 13.5h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  shield:
    '<path d="M12 3l7 3v5c0 4.2-3 7.4-7 8.5C8 18.4 5 15.2 5 11V6z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  refresh:
    '<path d="M4.6 11a7.5 7.5 0 0112.5-4.4L20 9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 4.5V9h-4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.4 13a7.5 7.5 0 01-12.5 4.4L4 15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19.5V15h4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
};

const CATEGORIES = [
  {
    icon: "ticket",
    label: "Reservas y pagos",
    desc: "Todo sobre reservas, pagos y confirmaciones.",
    items: [
      {
        q: "¿Cómo reservo una experiencia?",
        a: "Elige la fecha que te interese y escríbenos por WhatsApp; te llega un mensaje listo para enviar y te confirmamos tu lugar con todos los detalles.",
      },
      { q: "¿Cuál es el costo?", a: "Hikes locales: $400 MXN. Viajes especiales: bajo cotización." },
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "El pago del hike local se coordina por WhatsApp (transferencia o efectivo). Para los viajes te compartimos las opciones al momento de cotizar.",
      },
      {
        q: "¿La reserva queda confirmada?",
        a: "Tu lugar queda confirmado cuando recibes nuestra confirmación por WhatsApp con el punto de encuentro y los detalles del hike.",
      },
    ],
  },
  {
    icon: "mountain",
    label: "Experiencias",
    desc: "Información sobre niveles, duración y qué incluye.",
    items: [
      { q: "¿Necesito experiencia previa?", a: "No. Tenemos rutas por nivel y te decimos cuál te conviene según tu experiencia." },
      { q: "¿Cuántas personas van?", a: "Trabajamos con grupos reducidos: mínimo 12 y máximo 15." },
      { q: "¿A qué hora es el hike?", a: "Normalmente de 6:30 a. m. a 10:30 a. m. (puede variar según la ruta)." },
    ],
  },
  {
    icon: "backpack",
    label: "Preparación",
    desc: "Qué llevar, recomendaciones y entrenamiento.",
    items: [
      {
        q: "¿Qué debo llevar?",
        a: "Al reservar te enviamos un checklist con lo básico (agua, calzado, snack y ropa adecuada).",
      },
      {
        q: "¿Necesito entrenamiento previo?",
        a: "No es obligatorio. Elegimos la ruta según tu nivel; llegar bien hidratada y descansada te ayudará a disfrutarla más.",
      },
    ],
  },
  {
    icon: "shield",
    label: "Seguridad",
    desc: "Protocolos, guías y primeros auxilios.",
    items: [
      {
        q: "¿Es seguro? ¿Voy a ir sola?",
        a: "Nunca caminas sola. Vamos en grupo con guías experimentadas, rutas planificadas y protocolos de seguridad durante todo el recorrido.",
      },
      {
        q: "¿Qué pasa si hay mal clima?",
        a: "La seguridad va primero. Si el clima no es adecuado, reprogramamos la ruta y te avisamos con tiempo.",
      },
    ],
  },
  {
    icon: "refresh",
    label: "Cancelaciones",
    desc: "Políticas y cambios en tus reservas.",
    items: [
      {
        q: "¿Puedo cambiar la fecha de mi reserva?",
        a: "Sí. Escríbenos por WhatsApp con anticipación y reprogramamos tu lugar en otra fecha disponible.",
      },
      {
        q: "¿Con cuánta anticipación debo reservar?",
        a: "Entre más pronto, mejor: los cupos son limitados (12–15). Te recomendamos reservar en cuanto veas la fecha que te gusta.",
      },
    ],
  },
];

export function initFAQ(section) {
  if (!section) return;
  const catsEl = section.querySelector("#faq-cats");
  const accEl = section.querySelector("#faq-acc");
  if (!catsEl || !accEl) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeCat = 0;

  catsEl.innerHTML = CATEGORIES.map(
    (c, i) => `
    <button type="button" class="faq-cat${i === 0 ? " is-active" : ""}" data-cat="${i}" role="tab" aria-selected="${i === 0}">
      <span class="faq-cat__icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[c.icon]}</svg></span>
      <span class="faq-cat__meta">
        <span class="faq-cat__title">${c.label}</span>
        <span class="faq-cat__desc">${c.desc}</span>
      </span>
    </button>`
  ).join("");
  const catBtns = Array.from(catsEl.querySelectorAll(".faq-cat"));

  function renderAcc(catIndex, animate) {
    const items = CATEGORIES[catIndex].items;
    accEl.innerHTML = items
      .map(
        (it, idx) => `
      <div class="faq-acc__item${idx === 0 ? " is-open" : ""}">
        <button type="button" class="faq-acc__q" aria-expanded="${idx === 0 ? "true" : "false"}">
          <span>${it.q}</span>
          <span class="faq-acc__toggle" aria-hidden="true"></span>
        </button>
        <div class="faq-acc__body"><div class="faq-acc__inner"><p>${it.a}</p></div></div>
      </div>`
      )
      .join("");

    accEl.querySelectorAll(".faq-acc__item").forEach((item) => {
      const q = item.querySelector(".faq-acc__q");
      q.addEventListener("click", () => {
        const open = item.classList.contains("is-open");
        accEl.querySelectorAll(".faq-acc__item").forEach((o) => {
          o.classList.remove("is-open");
          o.querySelector(".faq-acc__q").setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("is-open");
          q.setAttribute("aria-expanded", "true");
        }
      });
    });

    if (animate && !reduce) {
      gsap.from(accEl.querySelectorAll(".faq-acc__item"), {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power3.out",
      });
    }
  }

  catBtns.forEach((b, i) => {
    b.addEventListener("click", () => {
      if (i === activeCat) return;
      activeCat = i;
      catBtns.forEach((x, k) => {
        x.classList.toggle("is-active", k === i);
        x.setAttribute("aria-selected", k === i ? "true" : "false");
      });
      renderAcc(i, true);
    });
  });

  renderAcc(0, false);

  // Reveal al entrar en viewport (una vez).
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        gsap.from(catBtns, { x: -18, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" });
        gsap.from(accEl.querySelectorAll(".faq-acc__item"), {
          y: 14,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.15,
          ease: "power3.out",
        });
      },
      { threshold: 0.2 }
    );
    io.observe(section);
  }
}
