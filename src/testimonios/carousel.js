import { gsap } from "gsap";

/**
 * Carrusel INFINITO de testimonios (notas de papel, relleno líquido azul).
 * Fix de rotación: la reposición del loop (normalize) ahora corre DESPUÉS de que
 * termina la animación —no a la mitad— así nunca "vuela" a una tarjeta lejana.
 */
const TESTIMONIOS = [
  { initial: "A", quote: "Nunca imaginé que podía llegar a una cima. Con ellas descubrí de lo que soy capaz.", author: "Ana" },
  { initial: "P", quote: "Encontré una familia. Ya no camino sola, y eso lo cambia todo.", author: "Paty" },
  { initial: "S", quote: "Cada domingo es mi terapia: regreso llena de energía y con amigas nuevas.", author: "Sofía" },
  { initial: "C", quote: "Empecé con miedo por mi edad. Hoy, a mis 54, subo montañas.", author: "Carmen" },
  { initial: "R", quote: "La seguridad y el acompañamiento son de otro nivel. Nunca me sentí sola.", author: "Regina" },
  { initial: "M", quote: "Perdí el miedo y gané confianza. Las Senderistas me cambiaron la vida.", author: "Mariana" },
  { initial: "F", quote: "De un hike local a soñar con Perú. Esta comunidad te hace crecer.", author: "Fernanda" },
];

const WAVE = `<svg class="tst-card__wave" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 q 15 -6 30 0 t 30 0 t 30 0 t 30 0 V12 H0 Z"/></svg>
<svg class="tst-card__wave tst-card__wave--2" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 q 15 5 30 0 t 30 0 t 30 0 t 30 0 V12 H0 Z"/></svg>`;

const clamp = gsap.utils.clamp;

export function initTestimonios(section) {
  if (!section) return;
  const track = section.querySelector("#tst-track");
  const viewport = section.querySelector(".tst__viewport");
  if (!track || !viewport) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const N = TESTIMONIOS.length;
  const REPEAT = 3; // clones para el loop infinito
  const data = [];
  for (let r = 0; r < REPEAT; r++) data.push(...TESTIMONIOS);

  track.innerHTML = data
    .map(
      (t) => `
    <li class="tst-card">
      <span class="tst-card__fill" aria-hidden="true">${WAVE}</span>
      <div class="tst-card__inner">
        <span class="tst-card__avatar">${t.initial}</span>
        <p class="tst-card__quote">“${t.quote}”</p>
        <p class="tst-card__author">— ${t.author}</p>
      </div>
    </li>`
    )
    .join("");

  const cards = Array.from(track.querySelectorAll(".tst-card"));
  const fills = cards.map((c) => c.querySelector(".tst-card__fill"));
  let active = N + Math.floor(N / 2);
  let animating = false;

  gsap.set(fills, { height: "0%", opacity: 0 });

  function trackXFor(i) {
    const vp = viewport.clientWidth;
    const cw = cards[0].offsetWidth;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;
    return vp / 2 - (i * (cw + gap) + cw / 2);
  }

  function targets(i) {
    const d = i - active;
    const a = d === 0;
    return {
      scale: a ? 1.06 : 0.86,
      rotation: a ? 0 : clamp(-9, 9, -d * 3.4),
      yPercent: a ? -4 : Math.min(Math.abs(d) * 6, 16),
      opacity: Math.abs(d) > 2 ? 0.28 : 1,
      z: 100 - Math.abs(d),
      fillH: a ? "100%" : "0%",
      fillO: a ? 1 : 0,
    };
  }

  function applyInstant() {
    cards.forEach((card, i) => {
      const t = targets(i);
      gsap.set(card, { scale: t.scale, rotation: t.rotation, yPercent: t.yPercent, opacity: t.opacity });
      card.style.zIndex = String(t.z);
      gsap.set(fills[i], { height: t.fillH, opacity: t.fillO });
    });
    gsap.set(track, { x: trackXFor(active) });
  }

  function applyAnimated() {
    const D = 0.7;
    cards.forEach((card, i) => {
      const t = targets(i);
      gsap.to(card, { scale: t.scale, rotation: t.rotation, yPercent: t.yPercent, opacity: t.opacity, duration: D, ease: "power3.out", overwrite: "auto" });
      card.style.zIndex = String(t.z);
      gsap.to(fills[i], { height: t.fillH, opacity: t.fillO, duration: t.fillH === "100%" ? 0.9 : 0.4, ease: "power2.out", overwrite: "auto" });
    });
    gsap.to(track, { x: trackXFor(active), duration: D, ease: "power3.out", overwrite: "auto" });
    return D;
  }

  // Reposición sin salto (loop): SOLO cuando la animación ya terminó.
  function normalize() {
    if (active < N) {
      active += N;
      applyInstant();
    } else if (active >= 2 * N) {
      active -= N;
      applyInstant();
    }
  }

  function go(dir) {
    if (animating) return;
    if (reduce) {
      active += dir;
      applyInstant();
      normalize();
      return;
    }
    animating = true;
    const out = cards[active];
    active += dir;
    // 1) la central se dobla un poco; 2) todo se desliza; 3) al terminar, normalize
    gsap.to(out, { rotation: dir > 0 ? 7 : -7, scale: 0.97, duration: 0.16, ease: "power2.in" });
    gsap.delayedCall(0.08, () => {
      const D = applyAnimated();
      gsap.delayedCall(D + 0.03, () => {
        animating = false;
        normalize();
      });
    });
  }

  section.querySelectorAll(".tst__arrow").forEach((btn) => {
    btn.addEventListener("click", () => go(parseInt(btn.dataset.dir, 10)));
  });
  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const d = i - active;
      if (d !== 0) go(Math.sign(d)); // siempre un paso (nunca vuela lejos)
    });
  });
  section.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  });

  let timer = null;
  const play = () => {
    if (reduce) return;
    stop();
    timer = setInterval(() => go(1), 4500);
  };
  const stop = () => {
    if (timer) clearInterval(timer), (timer = null);
  };
  section.addEventListener("mouseenter", stop);
  section.addEventListener("mouseleave", play);

  applyInstant();
  gsap.set(track, { opacity: 1 });
  play();

  let raf = 0;
  window.addEventListener(
    "resize",
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(applyInstant);
    },
    { passive: true }
  );
}
