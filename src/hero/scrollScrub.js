import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOTAL_FRAMES, HERO_SCROLL_VH, SCRUB_SMOOTH } from "./config.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Conecta el progreso del scroll (0→1) al índice de frame (0→último).
 *
 * Patrón de rendimiento:
 *  - GSAP escribe el progreso suavizado (scrub ~0.6) en un objeto proxy.
 *  - En cada onUpdate calculamos el índice y solo pedimos un dibujo si cambió;
 *    el redraw real lo decide FrameSequence.draw() (no redibuja "de a gratis").
 *
 * @param {HTMLElement} heroEl  sección hero a pinnear
 * @param {(index:number, progress:number)=>void} onFrame  índice objetivo + progreso 0→1
 */
export function initScrollScrub(heroEl, onFrame) {
  const state = { frame: 0 };
  const last = TOTAL_FRAMES - 1;

  const tween = gsap.to(state, {
    frame: last,
    ease: "none",
    scrollTrigger: {
      trigger: heroEl,
      start: "top top",
      end: () => "+=" + window.innerHeight * (HERO_SCROLL_VH / 100),
      pin: true,
      pinSpacing: true,
      scrub: SCRUB_SMOOTH,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
    // Usamos el valor SUAVIZADO del scrub (state.frame) tanto para el frame como
    // para el progreso del overlay → todo va perfectamente sincronizado.
    onUpdate: () => onFrame(state.frame, state.frame / last),
  });

  return {
    refresh: () => ScrollTrigger.refresh(),
    destroy: () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    },
  };
}
