import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';

const Galeria = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Imágenes de hikes y experiencias del grupo
  const imagenes = [
    {
      url: 'https://images.unsplash.com/photo-1568987241598-6155c31740f2',
      alt: 'Grupo en la cumbre',
      categoria: 'Hikes'
    },
    {
      url: 'https://images.unsplash.com/photo-1758599668974-6da5d7cc6cc4',
      alt: 'Amigas en el sendero',
      categoria: 'Comunidad'
    },
    {
      url: 'https://images.unsplash.com/photo-1758272959663-b30513083206',
      alt: 'Celebración en la cumbre',
      categoria: 'Logros'
    },
    {
      url: 'https://images.unsplash.com/photo-1506880648420-aafaa650d147',
      alt: 'Amanecer en la montaña',
      categoria: 'Paisajes'
    },
    {
      url: 'https://images.unsplash.com/photo-1558883493-8b86ff880fec',
      alt: 'Vista desde la cumbre',
      categoria: 'Vistas'
    },
    {
      url: 'https://images.pexels.com/photos/697244/pexels-photo-697244.jpeg',
      alt: 'Grupo celebrando',
      categoria: 'Comunidad'
    },
    {
      url: 'https://images.unsplash.com/photo-1568987241598-6155c31740f2',
      alt: 'Escalada en roca',
      categoria: 'Aventura'
    },
    {
      url: 'https://images.unsplash.com/photo-1758599668974-6da5d7cc6cc4',
      alt: 'En el bosque',
      categoria: 'Naturaleza'
    },
    {
      url: 'https://images.unsplash.com/photo-1506880648420-aafaa650d147',
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
            {imagenes.map((imagen, index) => (
              <div key={index} className="galeria-item hover-scale">
                <img src={imagen.url} alt={imagen.alt} className="galeria-imagen" />
                <div className="galeria-overlay">
                  <span className="galeria-categoria">{imagen.categoria}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="galeria-cta">
            <p className="cta-text-large">
              ¿Quieres formar parte de estas increíbles experiencias?
            </p>
            <a
              href="https://wa.me/528135688611?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
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