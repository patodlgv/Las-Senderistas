/**
 * Feed de Instagram (@lassenderistas) — últimos posts.
 *
 * Estrategia: usar el JSON que entrega Behold.so (https://behold.so). Tú conectas
 * la cuenta una sola vez (gratis), creas un feed y te dan una URL JSON tipo:
 *   https://feeds.behold.so/XXXXXXXXXXXX
 * Pégala en IG_FEED_JSON y listo: jala los posts reales y los pinta con el
 * estilo del sitio. Mientras no haya URL (o si falla la red), muestra un
 * respaldo con fotos reales de la comunidad para que la sección no quede vacía.
 */
export const IG_PROFILE = "https://www.instagram.com/lassenderistas/";
export const IG_MAX = 5; // últimos 5 posts

/**
 * SnapWidget (gratis): pega aquí TODO el <iframe ...></iframe> que te da
 * SnapWidget (widget tipo "Grid", responsive). En cuanto lo pongas, la sección
 * mostrará tus posts reales automáticamente; si lo dejas vacío, se ve el
 * respaldo con tus fotos.
 * Usa comillas invertidas (`) para pegar el código tal cual.
 */
export const SNAPWIDGET_EMBED = ``;

// Opción alternativa (Behold JSON) — déjala vacía si usas SnapWidget.
export const IG_FEED_JSON = "";

const FALLBACK = [
  { image: "/media/comunidad/c1.jpg", permalink: IG_PROFILE },
  { image: "/media/comunidad/c2.jpg", permalink: IG_PROFILE },
  { image: "/media/comunidad/c3.jpg", permalink: IG_PROFILE },
  { image: "/media/comunidad/c4.jpg", permalink: IG_PROFILE },
  { image: "/media/comunidad/c5.jpg", permalink: IG_PROFILE },
];

const IG_GLYPH = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>`;
const PLAY = `<span class="ig-card__play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg></span>`;

/** Normaliza distintas formas del JSON de Behold a {image, permalink, isVideo, caption}. */
function normalize(data) {
  const list = Array.isArray(data) ? data : data.posts || data.media || [];
  return list.map((p) => {
    const sizes = p.sizes || {};
    const image =
      sizes.medium?.mediaUrl ||
      sizes.small?.mediaUrl ||
      sizes.large?.mediaUrl ||
      p.thumbnailUrl ||
      p.thumbnail_url ||
      p.mediaUrl ||
      p.media_url ||
      p.url;
    const type = p.mediaType || p.media_type || "IMAGE";
    return {
      image,
      permalink: p.permalink || p.permalinkUrl || IG_PROFILE,
      isVideo: type === "VIDEO",
      caption: (p.caption || p.prunedCaption || "").trim(),
    };
  });
}

function cardHTML(it) {
  const cap = it.caption
    ? `<span class="ig-card__cap">${it.caption.slice(0, 90)}${it.caption.length > 90 ? "…" : ""}</span>`
    : "";
  return `
    <li class="ig-card">
      <a href="${it.permalink}" target="_blank" rel="noopener" aria-label="Ver en Instagram">
        <img src="${it.image}" alt="Publicación de Las Senderistas en Instagram" loading="lazy" />
        ${it.isVideo ? PLAY : ""}
        <span class="ig-card__overlay">
          <span class="ig-card__glyph">${IG_GLYPH}</span>
          ${cap}
        </span>
      </a>
    </li>`;
}

function render(gridEl, items) {
  gridEl.innerHTML = items.slice(0, IG_MAX).map(cardHTML).join("");
}

/** Carga (una sola vez) el script responsive de SnapWidget. */
function loadSnapwidgetScript() {
  if (document.getElementById("snapwidget-js")) return;
  const s = document.createElement("script");
  s.id = "snapwidget-js";
  s.src = "https://snapwidget.com/js/snapwidget.js";
  s.async = true;
  document.body.appendChild(s);
}

export async function initComunidad(gridEl) {
  if (!gridEl) return;

  // 1) SnapWidget (gratis) tiene prioridad si está configurado.
  if (SNAPWIDGET_EMBED.trim()) {
    gridEl.classList.add("ig-feed--embed");
    gridEl.innerHTML = SNAPWIDGET_EMBED;
    loadSnapwidgetScript();
    return;
  }

  // 2) Sin SnapWidget ni Behold → respaldo con fotos reales.
  if (!IG_FEED_JSON) {
    render(gridEl, FALLBACK);
    return;
  }

  try {
    const res = await fetch(IG_FEED_JSON, { mode: "cors" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const items = normalize(data).filter((x) => x.image);
    render(gridEl, items.length ? items : FALLBACK);
  } catch (err) {
    console.warn("[comunidad] no se pudo cargar el feed de IG, usando respaldo:", err);
    render(gridEl, FALLBACK);
  }
}
