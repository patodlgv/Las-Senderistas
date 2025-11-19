import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';

const Galeria = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imagenes = [
    {
      url: '/Images/las-senderistas-nieve.PNG',
      alt: 'Grupo en la cumbre',
      categoria: 'Hikes'
    },
    {
      url: '/Images/Quienes-somos.jpg',
      alt: 'Amigas en el sendero',
      categoria: 'Comunidad'
    },
    {
      url: '/Images/quienes-dos.jpg',
      alt: 'Celebración en la cumbre',
      categoria: 'Logros'
    },
    {
      url: '/Images/aniversario-senderistas.jpg',
      alt: 'Aniversario Senderista',
      categoria: 'Aniversario'
    },
    {
      // ojo: que coincida EXACTO con el nombre del archivo en /public/Videos
      url: '/Videos/video-taza.mp4',
      alt: 'Vista desde la cumbre',
      categoria: 'Reels'
    },
    {
      url: '/Videos/patagonia-senderistas.mp4',
      alt: 'Grupo celebrando',
      categoria: 'Comunidad'
    },
    {
      url: '/Videos/reel-3.mp4',
      alt: 'Escalada en roca',
      categoria: 'Aventura'
    },
    {
      url: '/Videos/reel-4.mp4',
      alt: 'En el bosque',
      categoria: 'Naturaleza'
    },
    {
      url: '/Videos/reel-5.mp4',
      alt: 'Montañas al atardecer',
      categoria: 'Paisajes'
    }
  ];

  return (
    <div className="galeria-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Galería</h1>
          <p className="page-hero-subtitle">
            Momentos memorables de nuestras aventuras en las montañas
          </p>
        </div>
      </section>

      {/* Instagram Link */}
      <section className="instagram-banner">
        <div className="container">
          <div className="instagram-content">
            <Instagram size={32} />
            <div>
              <h3 className="instagram-title">Síguenos en Instagram</h3>
              <p className="instagram-text">
                Descubre más fotos y videos de nuestras aventuras en @lassenderistas
              </p>
            </div>
            <a
              href="https://instagram.com/lassenderistas"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ver en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Galeria Grid */}
      <section className="galeria-section">
        <div className="container">
          <div className="galeria-grid">
            {imagenes.map((item, index) => {
              const esVideo = item.url.endsWith('.mp4');

              return (
                <div key={index} className="galeria-item hover-scale">
                  {esVideo ? (
                    <video
                      src={item.url}
                      className="galeria-imagen"
                      controls
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="galeria-imagen"
                    />
                  )}
                  <div className="galeria-overlay">
                    <span className="galeria-categoria">{item.categoria}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="galeria-cta">
            <p className="cta-text-large">
              ¿Quieres formar parte de estas increíbles experiencias?
            </p>
            <a
              href="https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              Únete Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Galeria;
