import "./styles/main.css";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FrameSequence } from "./hero/frameSequence.js";
import { initScrollScrub } from "./hero/scrollScrub.js";
import { initRutasMap } from "./rutas/map.js";
import { initComunidad } from "./comunidad/feed.js";
import { initTestimonios } from "./testimonios/carousel.js";
import { initFAQ } from "./faq/faq.js";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Scroll suave (Lenis) — integrado con GSAP/ScrollTrigger.
   Hace que el scroll (y el scrub del hero) fluya y no se "trabe"
   al pasar rápido. Se desactiva con prefers-reduced-motion.
   ============================================================ */
let lenis = null;
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  lenis = new Lenis({
    lerp: 0.12, // suavizado (más bajo = más suave/pesado)
    wheelMultiplier: 1,
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const canvas = document.getElementById("hero-canvas");
const heroEl = document.getElementById("hero");
const loaderEl = document.getElementById("loader");
const loaderFill = document.getElementById("loader-fill");
const loaderPct = document.getElementById("loader-pct");
const loaderQuote = document.getElementById("loader-quote");

// Red de seguridad: pase lo que pase (error de JS, decode lento en móvil…),
// el loader NUNCA se queda pegado en blanco. A los 10s se oculta sí o sí.
setTimeout(() => loaderEl && loaderEl.classList.add("is-hidden"), 10000);

/* Frases de Las Senderistas que rotan en el loader (fondo blanco). */
(function rotateLoaderQuotes() {
  if (!loaderQuote || !loaderEl) return;
  const QUOTES = [
    "Nunca caminas sola.",
    "El objetivo no era subir la montaña, era disfrutar la vida.",
    "Arriésgate: todo lo bueno empieza fuera de tu zona de confort.",
    "Lo que hoy parece imposible, mañana es tu cima.",
    "Camina segura, camina feliz.",
    "Sé la mejor versión de ti misma.",
  ];
  let i = 0;
  const timer = setInterval(() => {
    if (loaderEl.classList.contains("is-hidden")) {
      clearInterval(timer);
      return;
    }
    i = (i + 1) % QUOTES.length;
    loaderQuote.classList.add("is-swap");
    setTimeout(() => {
      loaderQuote.textContent = QUOTES[i];
      loaderQuote.classList.remove("is-swap");
    }, 420);
  }, 2600);
})();

/* Menú móvil (botón hamburguesa → despliega el menú). */
(function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-mobile");
  if (!toggle || !menu) return;
  const setOpen = (open) => {
    toggle.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
  });
})();

const sequence = new FrameSequence(canvas);
sequence.resize();

/**
 * Escenas de contenido que entran/salen sobre el video según el progreso del
 * scroll (0→1):
 *  - in[0]→in[1]:  fade-in (sube desde abajo).
 *  - in[1]→out[0]: visible (hold).
 *  - out[0]→out[1]: fade-out (sigue subiendo).
 *
 * Hero → respiro → Islandia → Machu Picchu → video hasta el 4K final.
 */
const scenes = [
  {
    el: document.getElementById("scene-hero"),
    in: [-0.1, -0.05], // ya visible desde el inicio
    out: [0.0, 0.14],
    yEnter: 0,
    yLeave: -36,
    last: -1,
  },
  {
    // Tierras altas verdes (estilo Islandia, video-frames ~88–125, bandera izquierda).
    el: document.getElementById("scene-islandia"),
    in: [0.19, 0.26],
    out: [0.37, 0.44],
    yEnter: 44,
    yLeave: -36,
    last: -1,
  },
  {
    // Machu Picchu (video-frames ~166–237, bandera a la izquierda).
    el: document.getElementById("scene-machupicchu"),
    in: [0.49, 0.56],
    out: [0.63, 0.7],
    yEnter: 44,
    yLeave: -36,
    last: -1,
  },
  {
    // Pico de Orizaba (cumbre nevada piramidal, bandera a la derecha).
    el: document.getElementById("scene-orizaba"),
    in: [0.7, 0.76],
    out: [0.81, 0.85],
    yEnter: 44,
    yLeave: -36,
    last: -1,
  },
  {
    // Sierra Negra (cierre). Entra y queda fija sobre el atardecer; al final
    // todo (incluida esta escena) se disuelve a blanco con el whiteout para
    // empalmar con "Sobre nosotras".
    el: document.getElementById("scene-sierra"),
    in: [0.84, 0.9],
    out: [1.1, 1.15], // no se desvanece por sí sola; lo hace el whiteout
    yEnter: 44,
    yLeave: -36,
    last: -1,
  },
];

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function applyScene(s, p) {
  let op;
  let phase;
  if (p < s.in[0]) {
    op = 0;
    phase = "before";
  } else if (p < s.in[1]) {
    op = clamp01((p - s.in[0]) / (s.in[1] - s.in[0]));
    phase = "in";
  } else if (p <= s.out[0]) {
    op = 1;
    phase = "hold";
  } else if (p < s.out[1]) {
    op = clamp01(1 - (p - s.out[0]) / (s.out[1] - s.out[0]));
    phase = "out";
  } else {
    op = 0;
    phase = "after";
  }

  if (Math.abs(op - s.last) < 0.002) return; // evita writes redundantes
  s.last = op;

  let y = 0;
  if (phase === "before" || phase === "in") y = (1 - op) * s.yEnter;
  else if (phase === "out" || phase === "after") y = (1 - op) * s.yLeave;

  s.el.style.opacity = op.toFixed(3);
  s.el.style.transform = `translateY(${y.toFixed(1)}px)`;
  const interactive = op > 0.04;
  s.el.style.pointerEvents = interactive ? "auto" : "none";
  s.el.setAttribute("aria-hidden", interactive ? "false" : "true");
}

function updateScenes(progress) {
  for (const s of scenes) applyScene(s, progress);
}

async function boot() {
  try {
    await sequence.preload(
      (loaded, total) => {
        const pct = Math.round((loaded / total) * 100);
        loaderFill.style.width = pct + "%";
        loaderPct.textContent = pct + "%";
      },
      () => {
        // Poster inmediato: dibuja el primer frame apenas está listo.
        sequence.resize();
        sequence.draw(0, true);
      }
    );
  } catch (e) {
    // Nunca bloquees el sitio por el hero: continúa e igual oculta el loader.
    console.warn("[hero] preload falló, continúo sin bloquear:", e);
  }

  // Oculta el loader YA (aunque el resto falle, el sitio se ve).
  loaderEl.classList.add("is-hidden");

  updateScenes(0); // estado inicial de escenas

  // Transición a blanco del final del video (manejada por el scroll): de 0
  // a 1 en el último tramo, para disolver el video y empalmar con la sección
  // blanca de "Sobre nosotras" sin corte seco.
  const whiteoutEl = document.getElementById("hero-whiteout");
  const WHITEOUT_START = 0.9; // empieza a aparecer el blanco (ya con Sierra puesta)
  const WHITEOUT_END = 1.0; // totalmente blanco al final
  let lastWhiteout = -1;
  function updateWhiteout(progress) {
    if (!whiteoutEl) return;
    let t = (progress - WHITEOUT_START) / (WHITEOUT_END - WHITEOUT_START);
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const eased = t * t * (3 - 2 * t); // smoothstep
    if (Math.abs(eased - lastWhiteout) < 0.002) return;
    lastWhiteout = eased;
    whiteoutEl.style.opacity = eased.toFixed(3);
  }

  const scrub = initScrollScrub(heroEl, (index, progress) => {
    sequence.draw(index);
    updateScenes(progress);
    updateWhiteout(progress);
  });

  // Resize: recalcula canvas + cover, redibuja el frame actual, refresca ScrollTrigger.
  let resizeRAF = 0;
  window.addEventListener(
    "resize",
    () => {
      cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        if (sequence.resize()) {
          sequence.draw(sequence.onScreenIndex < 0 ? 0 : sequence.onScreenIndex, true);
        }
        scrub.refresh();
      });
    },
    { passive: true }
  );

  loaderEl.classList.add("is-hidden");
}

boot();

/* ============================================================
   Carrusel "Sobre nosotros" — las flechas desplazan el track.
   ============================================================ */
(function initAboutCarousel() {
  const track = document.getElementById("about-track");
  if (!track) return;
  const prev = document.querySelector(".about__arrow--prev");
  const next = document.querySelector(".about__arrow--next");
  const step = () => {
    const card = track.querySelector(".about-card");
    if (!card) return track.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(track).columnGap || "20") || 20;
    return card.getBoundingClientRect().width + gap;
  };
  prev?.addEventListener("click", () =>
    track.scrollBy({ left: -step(), behavior: "smooth" })
  );
  next?.addEventListener("click", () =>
    track.scrollBy({ left: step(), behavior: "smooth" })
  );

  // Reproduce cada video solo cuando entra en pantalla; lo pausa al salir.
  // Así no se descargan/reproducen los 5 videos a la vez estando arriba.
  const videos = track.querySelectorAll("video");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (videos.length && !reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target;
          if (e.isIntersecting) {
            if (v.preload !== "auto") v.preload = "auto";
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.35 }
    );
    videos.forEach((v) => io.observe(v));
  }
})();

/* ============================================================
   Carta grande "Sobre nosotras" (modal).
   ============================================================ */
(function initAboutModal() {
  const opener = document.getElementById("about-open");
  const modal = document.getElementById("about-modal");
  if (!opener || !modal) return;

  let lastFocus = null;
  function open() {
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
    const closeBtn = modal.querySelector(".about-modal__close");
    if (closeBtn) closeBtn.focus();
  }
  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lenis) lenis.start();
    if (lastFocus) lastFocus.focus();
  }

  opener.addEventListener("click", open);
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();

/* ============================================================
   Mapa de rutas + filtro por dificultad.
   ============================================================ */
(function initRutas() {
  const mapEl = document.getElementById("rutas-map");
  if (!mapEl) return;
  const detailEl = document.getElementById("rutas-detail");
  const api = initRutasMap(mapEl, detailEl);
  if (!api) return;

  const chips = document.querySelectorAll(".rutas-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      api.setFilter(chip.dataset.level);
    });
  });
})();

/* ============================================================
   Comunidad — feed de Instagram.
   ============================================================ */
initComunidad(document.getElementById("ig-feed"));

/* ============================================================
   Testimonios — carrusel GSAP.
   ============================================================ */
initTestimonios(document.getElementById("testimonios"));

/* ============================================================
   Preguntas frecuentes — tarjetas flip.
   ============================================================ */
initFAQ(document.getElementById("faq"));

/* ============================================================
   Scroll suave para los enlaces internos del menú y botones.
   ============================================================ */
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    a.addEventListener("click", (e) => {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.1 });
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();

/* ============================================================
   Contacto — el formulario arma el mensaje y lo envía por WhatsApp
   al número de la dueña (81 1917 6335).
   ============================================================ */
(function initContacto() {
  const form = document.getElementById("contacto-form");
  if (!form) return;
  const PHONE = "528119176335";
  const fileInput = document.getElementById("contacto-file");
  const fileName = form.querySelector(".contacto__file-name");

  // Muestra el nombre del archivo elegido (y avisa si pasa de 10 MB).
  fileInput?.addEventListener("change", () => {
    const f = fileInput.files && fileInput.files[0];
    if (!f) {
      fileName.textContent = "Adjuntar archivo (opcional)";
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      fileName.textContent = "El archivo supera 10 MB";
      fileInput.value = "";
      return;
    }
    fileName.textContent = f.name;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return; // valida requeridos + email

    const data = new FormData(form);
    const nombre = (data.get("nombre") || "").toString().trim();
    const correo = (data.get("correo") || "").toString().trim();
    const asunto = (data.get("asunto") || "").toString().trim();
    const mensaje = (data.get("mensaje") || "").toString().trim();
    const file = fileInput && fileInput.files && fileInput.files[0];

    let text = "¡Hola Las Senderistas! 👋\n\n";
    text += `*Nombre:* ${nombre}\n`;
    text += `*Correo:* ${correo}\n`;
    if (asunto) text += `*Asunto:* ${asunto}\n`;
    text += `\n${mensaje}`;
    if (file) text += `\n\n(Tengo un archivo para compartir: ${file.name})`;

    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  });
})();
