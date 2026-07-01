import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ROUTES, whatsappLink } from "./data.js";

/* Icono de montaña (mismo trazo que el resto del sitio) para el pin. */
const MOUNTAIN_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19l6-10 4 6 2-3 6 7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 9l1.6 2.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`;

const STAT_ICONS = {
  altitud: `<svg viewBox="0 0 24 24"><path d="M2 20l6-10 4 5.5L15 11l7 9z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  duracion: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  desnivel: `<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7h5v5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  precio: `<svg viewBox="0 0 24 24"><path d="M20 13.4l-7 7a2 2 0 01-2.8 0L3.6 14a2 2 0 01-.6-1.4V5a2 2 0 012-2h7.6a2 2 0 011.4.6l6.6 6.6a2 2 0 010 2.6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8" cy="8" r="1.4" fill="currentColor"/></svg>`,
};

/** Marcador HTML personalizado (círculo + montaña + etiqueta al pasar el cursor). */
function makeIcon(route) {
  const kind = route.type === "destino" ? " ruta-pin--destino" : "";
  const sub = route.type === "destino" ? route.region : route.levelLabel;
  return L.divIcon({
    className: "ruta-pin-wrap",
    html: `
      <div class="ruta-pin${kind}">
        <span class="ruta-pin__dot">${MOUNTAIN_SVG}</span>
        <span class="ruta-pin__label">
          <span class="ruta-pin__name">${route.name}</span>
          <span class="ruta-pin__lvl">${sub}</span>
        </span>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17], // centra el punto exactamente en la coordenada
  });
}

/** Tarjeta de detalle que se muestra en el panel de la izquierda. */
function detailHTML(route) {
  const close = `
    <button class="rutas__detail-close" type="button" aria-label="Cerrar">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>`;
  const media = `<div class="rutas__detail-media"><img src="${route.image}" alt="${route.name}" /></div>`;

  if (route.type === "destino") {
    return `
      ${close}
      ${media}
      <div class="rutas__detail-body">
        <p class="rutas__detail-eyebrow rutas__detail-eyebrow--mundo">${route.region}</p>
        <h3 class="rutas__detail-name">${route.name}</h3>
        <p class="rutas__detail-desc">${route.description}</p>
      </div>`;
  }

  const stat = (key, label, value) => `
    <div class="ruta-stat">
      <span class="ruta-stat__icon">${STAT_ICONS[key]}</span>
      <span class="ruta-stat__meta"><span class="ruta-stat__label">${label}</span><span class="ruta-stat__value">${value}</span></span>
    </div>`;
  return `
    ${close}
    ${media}
    <div class="rutas__detail-body">
      <p class="rutas__detail-eyebrow">${route.levelLabel}</p>
      <h3 class="rutas__detail-name">${route.name}</h3>
      <p class="rutas__detail-desc">${route.description}</p>
      <div class="rutas__detail-stats">
        ${stat("altitud", "Altitud", route.stats.altitud)}
        ${stat("duracion", "Duración", route.stats.duracion)}
        ${stat("desnivel", "Desnivel", route.stats.desnivel)}
        ${stat("precio", "Precio", route.stats.precio)}
      </div>
      <a class="rutas__detail-cta" href="${whatsappLink(route)}" target="_blank" rel="noopener">
        Reservar
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>`;
}

/**
 * Inicializa el mapa mundial. Al picar un pin, la ficha (imagen + info) se
 * muestra en `detailEl` (panel sobre la columna izquierda), no en un globo.
 * Devuelve { map, setFilter }.
 */
export function initRutasMap(rootEl, detailEl) {
  if (!rootEl) return null;

  const map = L.map(rootEl, {
    scrollWheelZoom: false, // evita capturar el scroll de la página
    zoomControl: false,
    worldCopyJump: true,
    minZoom: 2,
  });
  map.attributionControl.setPrefix("");
  L.control.zoom({ position: "topright" }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    subdomains: "abcd",
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  // Zoom con rueda solo al enfocar el mapa.
  map.on("focus", () => map.scrollWheelZoom.enable());
  map.on("blur", () => map.scrollWheelZoom.disable());

  let activeEl = null;
  function clearActive() {
    if (activeEl) activeEl.classList.remove("is-active");
    activeEl = null;
  }
  function closeDetail() {
    if (detailEl) {
      detailEl.classList.remove("is-open");
      detailEl.setAttribute("aria-hidden", "true");
    }
    clearActive();
  }
  function openDetail(route, marker) {
    if (!detailEl) return;
    detailEl.innerHTML = detailHTML(route);
    detailEl.classList.add("is-open");
    detailEl.setAttribute("aria-hidden", "false");
    detailEl.scrollTop = 0;
    clearActive();
    activeEl = marker.getElement();
    if (activeEl) activeEl.classList.add("is-active");
  }

  const markers = ROUTES.map((route) => {
    const m = L.marker(route.coords, {
      icon: makeIcon(route),
      riseOnHover: true,
      keyboard: true,
      title: route.name,
    });
    m.on("click", () => openDetail(route, m));
    m.addTo(map);
    return { route, marker: m };
  });

  // Cerrar (botón X) — delegación de eventos en el panel.
  if (detailEl) {
    detailEl.addEventListener("click", (e) => {
      if (e.target.closest(".rutas__detail-close")) closeDetail();
    });
  }
  // Esc cierra; click en el mapa (no en un pin) también.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetail();
  });
  map.on("click", closeDetail);

  // Encuadra todos los pines (vista mundial).
  // Vista inicial centrada en MÉXICO (donde están las rutas locales y varios
  // destinos), no en el centroide mundial (que caía en África). Para ver los
  // destinos del mundo, el usuario solo aleja el zoom.
  map.setView([23.5, -102], 5);

  function setFilter(level) {
    markers.forEach(({ route, marker }) => {
      const show = level === "todas" || route.levels.includes(level);
      const el = marker.getElement();
      if (el) el.style.display = show ? "" : "none";
    });
    closeDetail();
  }

  requestAnimationFrame(() => map.invalidateSize());
  window.addEventListener("resize", () => map.invalidateSize(), { passive: true });

  return { map, setFilter };
}
