import { TOTAL_FRAMES, frameURL } from "./config.js";

/**
 * FrameSequence (4K-ready, memoria acotada)
 * -----------------------------------------
 * Problema del 4K: un frame 3832×2160 decodificado ocupa ~33 MB en RAM.
 * Mantener los 368 frames decodificados = ~12 GB → el navegador crashea.
 *
 * Estrategia (la que usan los sitios premium para secuencias en 4K):
 *  1. Se precargan TODOS los frames pero COMPRIMIDOS (Blob WebP) → memoria barata
 *     (~150 MB para 368 frames 4K). El loader % refleja esta descarga.
 *  2. Solo se DECODIFICAN a ImageBitmap los frames de una ventana deslizante
 *     alrededor del índice actual (con decode-ahead en la dirección del scroll).
 *  3. Un cache LRU acotado (MAX_DECODED) cierra (.close()) los bitmaps lejanos
 *     para liberar memoria. RAM total acotada (~1 GB máx), no 12 GB.
 *
 *  - createImageBitmap decodifica fuera del main thread → sin jank de decode.
 *  - DPR-aware capado a 2. drawImage con matemática object-fit: cover.
 *  - Solo redibuja cuando cambia el frame en pantalla (no redraw "de a gratis").
 */

// Los frames son ligeros (rampa 1920→1280; solo el primero es 4K), así que
// podemos permitir un cache de decode más generoso → scrub más fluido.
const MAX_DECODED = 44; // bitmaps vivos a la vez (~1920px ≈ 8 MB c/u)
const DECODE_AHEAD = 20; // frames a decodificar por delante (dirección del scroll)
const DECODE_BEHIND = 8; // colchón hacia atrás para scroll inverso

/**
 * Decodifica un Blob a algo dibujable en canvas.
 * Usa createImageBitmap (off-thread, ideal) y si NO existe o FALLA (Safari viejo,
 * algunos WebViews de Android → causa de "pantalla blanca en móvil"), cae a un
 * <img>. Ambos funcionan con ctx.drawImage y tienen width/height utilizables.
 */
async function decodeBlob(blob) {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(blob);
    } catch (_) {
      /* cae al fallback con <img> */
    }
  }
  return await new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

export class FrameSequence {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });

    /** @type {(Blob|null)[]} fuentes comprimidas (todas precargadas) */
    this.blobs = new Array(TOTAL_FRAMES).fill(null);
    /** @type {Map<number, ImageBitmap>} cache LRU de bitmaps decodificados */
    this.bitmaps = new Map();
    /** @type {Set<number>} índices con decode en curso */
    this.decoding = new Set();

    this.onScreenIndex = -1; // frame actualmente pintado
    this.targetIndex = 0; // último frame solicitado
    this.dir = 1; // dirección de avance del scroll

    this.dpr = 1;
    this.cssW = 0;
    this.cssH = 0;
  }

  /**
   * Precarga (descarga) TODOS los blobs comprimidos.
   * @param {(loaded:number,total:number)=>void} onProgress
   * @param {(first:ImageBitmap)=>void} onFirstReady  poster inmediato (frame 1)
   */
  async preload(onProgress, onFirstReady) {
    let loaded = 0;
    const fetchOne = async (i) => {
      // Resiliente: si un frame falla (404/red), no rompe la precarga ni el scrub;
      // ese índice quedará como null y draw() conservará el frame previo.
      try {
        const res = await fetch(frameURL(i + 1)); // ffmpeg es 1-indexed
        if (res.ok) this.blobs[i] = await res.blob();
      } catch (_) {
        /* frame omitido */
      }
      loaded += 1;
      onProgress?.(loaded, TOTAL_FRAMES);
    };

    // Primer frame primero → poster inmediato.
    await fetchOne(0);
    const first = await this._decode(0);
    if (first) onFirstReady?.(first);

    // Resto con concurrencia limitada.
    const CONCURRENCY = 12;
    let next = 1;
    const worker = async () => {
      while (next < TOTAL_FRAMES) {
        await fetchOne(next++);
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  }

  /** Decodifica (o recupera de cache) el frame i a ImageBitmap. */
  async _decode(i) {
    if (i < 0 || i >= TOTAL_FRAMES) return null;

    // Hit de cache → refresca su posición LRU.
    if (this.bitmaps.has(i)) {
      const b = this.bitmaps.get(i);
      this.bitmaps.delete(i);
      this.bitmaps.set(i, b);
      return b;
    }
    if (!this.blobs[i] || this.decoding.has(i)) return null;

    this.decoding.add(i);
    try {
      const bmp = await decodeBlob(this.blobs[i]);
      this.bitmaps.set(i, bmp);
      this._evict();
      return bmp;
    } catch (_) {
      return null; // un frame que no decodifica no debe romper el hero
    } finally {
      this.decoding.delete(i);
    }
  }

  /** Cierra los bitmaps más lejanos al objetivo hasta respetar MAX_DECODED. */
  _evict() {
    while (this.bitmaps.size > MAX_DECODED) {
      let worstKey = null;
      let worstDist = -1;
      for (const k of this.bitmaps.keys()) {
        if (k === this.onScreenIndex) continue; // nunca tiramos el que está en pantalla
        const d = Math.abs(k - this.targetIndex);
        if (d > worstDist) {
          worstDist = d;
          worstKey = k;
        }
      }
      if (worstKey === null) break;
      const b = this.bitmaps.get(worstKey);
      this.bitmaps.delete(worstKey);
      b.close?.();
    }
  }

  /** Lanza la decodificación de la ventana alrededor de i (sin await: en background). */
  _ensureWindow(i) {
    this._decode(i);
    for (let k = 1; k <= DECODE_AHEAD; k++) this._decode(i + this.dir * k);
    for (let k = 1; k <= DECODE_BEHIND; k++) this._decode(i - this.dir * k);
  }

  /** Devuelve el bitmap decodificado más cercano a i (para no congelar en scroll rápido). */
  _nearestDecoded(i) {
    let bestKey = null;
    let bestDist = Infinity;
    for (const k of this.bitmaps.keys()) {
      const d = Math.abs(k - i);
      if (d < bestDist) {
        bestDist = d;
        bestKey = k;
      }
    }
    return bestKey === null ? null : { idx: bestKey, bmp: this.bitmaps.get(bestKey) };
  }

  /** Recalcula tamaño del canvas (CSS + buffer DPR≤2). Devuelve true si cambió. */
  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = this.canvas.clientWidth;
    const cssH = this.canvas.clientHeight;

    const changed = dpr !== this.dpr || cssW !== this.cssW || cssH !== this.cssH;
    if (!changed) return false;

    this.dpr = dpr;
    this.cssW = cssW;
    this.cssH = cssH;
    this.canvas.width = Math.round(cssW * dpr);
    this.canvas.height = Math.round(cssH * dpr);
    return true;
  }

  /** Dibuja un bitmap cubriendo el canvas (object-fit: cover). */
  _drawCover(bitmap) {
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const iw = bitmap.naturalWidth || bitmap.width;
    const ih = bitmap.naturalHeight || bitmap.height;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) * 0.5;
    const dy = (ch - dh) * 0.5;

    this.ctx.drawImage(bitmap, dx, dy, dw, dh);
  }

  /**
   * Solicita dibujar el frame en `index`.
   * @param {number} index
   * @param {boolean} force  fuerza redibujo aunque no cambie (tras resize)
   */
  draw(index, force = false) {
    const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    if (i !== this.targetIndex) this.dir = i >= this.targetIndex ? 1 : -1;
    this.targetIndex = i;

    // Mantén la ventana de decode caliente alrededor del objetivo.
    this._ensureWindow(i);

    const bmp = this.bitmaps.get(i);
    if (bmp) {
      if (force || i !== this.onScreenIndex) {
        this._drawCover(bmp);
        this.onScreenIndex = i;
      }
      return;
    }

    // Aún no decodificado. En vez de congelar en el frame viejo (lo que hace que
    // el scroll rápido se "trabe"), pintamos el frame decodificado MÁS CERCANO al
    // objetivo → el movimiento siempre se ve continuo aunque no sea pixel-exacto.
    const near = this._nearestDecoded(i);
    if (near && (force || near.idx !== this.onScreenIndex)) {
      this._drawCover(near.bmp);
      this.onScreenIndex = near.idx;
    }

    // Y cuando el frame exacto termine de decodificar, lo refinamos (si sigue vigente).
    this._decode(i).then((b) => {
      if (b && this.targetIndex === i) {
        this._drawCover(b);
        this.onScreenIndex = i;
      }
    });
  }
}
