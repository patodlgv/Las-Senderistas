/**
 * Configuración de la secuencia de frames del hero.
 * Estos valores reflejan la extracción REAL hecha con ffmpeg (no se adivinan):
 *   - Video fuente: 3832×2160, 60fps, 736 frames, ~12.27s
 *   - Extracción: fps capado a 30. RAMPA DE RESOLUCIÓN para que el scroll cargue
 *     y vaya fluido: frame 1 = 4K (3832px, el "poster" que se ve al entrar),
 *     resto = ancho descendente hacia el centro y ascendente hacia el final.
 *     La secuencia se CORTA en el frame 339 (toma final del atardecer) que también
 *     va en 4K: así el scroll termina justo en esa toma, sin frames posteriores.
 *
 * TOTAL_FRAMES se fija al número real de archivos generados en /public/frames.
 */
// Detecta móvil UNA vez al cargar. En móvil el video desktop (horizontal) se ve
// mal, así que servimos una secuencia VERTICAL propia (/frames-mobile) con la
// misma técnica de scroll-scrub. Ambos sets tienen 339 frames → mismo mapeo de
// progreso, así las escenas siguen alineadas.
// "Móvil de verdad" = pantalla angosta Y táctil. El `pointer: coarse` evita que
// una laptop (aunque Windows la escale y su ancho CSS sea ≤820) active lo móvil.
export const IS_MOBILE =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 820px) and (pointer: coarse)").matches;

export const FRAMES_PATH = IS_MOBILE ? "/frames-mobile" : "/frames";
export const FRAME_PREFIX = "frame_";
export const FRAME_EXT = "webp";
export const FRAME_PAD = 4; // frame_%04d

// Nº real de frames (frame_0001 … frame_<TOTAL_FRAMES>). Desktop y móvil = 339.
export const TOTAL_FRAMES = 339;

// Cache-busting: súbelo cuando regeneres/cambies frames para forzar al navegador
// a re-descargarlos (evita que sirva versiones viejas desde su caché).
export const FRAMES_VERSION = 6;

// Recorrido de scroll del hero, en viewports (≈350vh de pin).
export const HERO_SCROLL_VH = 350;

// Suavizado del scrub de ScrollTrigger.
export const SCRUB_SMOOTH = 0.6;

// Fracción del recorrido (0→1) en la que el overlay del hero se desvanece por
// completo al empezar el scroll. 0.16 = se va en el primer ~16% del scrub.
export const OVERLAY_FADE_END = 0.16;

/** Devuelve la URL del frame i (1-indexed para coincidir con ffmpeg). */
export function frameURL(i) {
  const n = String(i).padStart(FRAME_PAD, "0");
  return `${FRAMES_PATH}/${FRAME_PREFIX}${n}.${FRAME_EXT}?v=${FRAMES_VERSION}`;
}
