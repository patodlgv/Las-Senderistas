import React, { useEffect, useRef } from 'react'; // Importamos useRef
import { Link } from 'react-router-dom';
import { Mountain, Users, Shield, Calendar, MapPin, Heart } from 'lucide-react';

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Forzar reproducción al cargar para asegurar autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevenido por el navegador:", error);
      });
    }
  }, []);

  const experiencias = [
    {
      nombre: 'Cerro de la Silla',
      descripcion: 'El ícono de Monterrey. Una experiencia desafiante con vistas panorámicas incomparables.',
      nivel: 'Intermedio-Avanzado',
      imagen: '/Images/cerro-silla.jpg'
    },
    {
      nombre: 'La Martha',
      descripcion: 'Una ruta clásica con pendientes exigentes, nieve en invierno y vistas espectaculares de la ciudad.',
      nivel: 'Intermedio',
      imagen: '/Images/la-martha-nevada.png'
    },
    {
      nombre: 'Peña de Bernal o Tepozteco',
      descripcion: 'Abril 2026. Disfruta de la magia de los pueblos mágicos y rutas con energía única.',
      nivel: 'Principiante-Intermedio',
      imagen: '/Images/Cerro-del-agujerado-G1.jpg' 
    },
    {
      nombre: 'Perú',
      descripcion: 'Mayo 2026. Una expedición internacional inolvidable recorriendo los senderos sagrados de los Incas.',
      nivel: 'Intermedio',
      imagen: '/Images/equipo-llevar.jpg' 
    },
    {
      nombre: 'Sierra Negra',
      descripcion: 'Agosto 2026. Conquista el quinto pico más alto de México. Un reto de alta montaña a 4,580m.',
      nivel: 'Avanzado',
      imagen: '/Images/sierra-negra.jpg'
    },
    {
      nombre: 'Islandia',
      descripcion: 'Octubre 2026. Tierra de fuego y hielo. Una travesía épica entre glaciares y auroras boreales.',
      nivel: 'Todas',
      imagen: '/Images/aurora-boreal.webp'
    }
  ];

  const testimonios = [
    {
      nombre: 'María',
      texto: 'Encontré en Las Senderistas no solo un grupo para hacer hiking, sino una familia que me motiva a superarme cada día.'
    },
    {
      nombre: 'Ana',
      texto: 'Nunca había hecho senderismo. Con Las Senderistas me sentí segura desde el primer día y ahora no puedo dejar de ir a las montañas.'
    },
    {
      nombre: 'Laura',
      texto: 'La comunidad es increíble. Cada hike es una nueva aventura llena de risas, retos y amistades verdaderas.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section con Video de Fondo */}
      <section className="hero-section">
        <video 
          ref={videoRef}
          className="hero-video" 
          autoPlay 
          loop 
          muted 
          defaultMuted={true} /* CRUCIAL PARA REACT */
          playsInline /* CRUCIAL PARA IPHONE */
        >
          {/* Asegúrate de que este nombre coincida con el video ligero que subiste */}
        
<source src="/Videos/hero-final-v2.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title animated fadeIn">Las Senderistas</h1>
          <p className="hero-subtitle animated fadeIn delay-200ms">Club de Hike y Viajes</p>
          <p className="hero-description animated fadeIn delay-500ms">
            Una comunidad de mujeres que comparten la pasión por las montañas, la naturaleza y las nuevas experiencias
          </p>
          <div className="hero-buttons animated fadeIn delay-500ms">
            <Link to="/calendario" className="btn-cta">
              Ver Calendario de Hikes
            </Link>
            <a
              href="https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-hero"
            >
              Unirme a Las Senderistas
            </a>
          </div>
        </div>
      </section>

      {/* Ventajas Section */}
      <section className="advantages-section">
        <div className="container">
          <h2 className="section-title">¿Por qué unirte a nosotras?</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="advantage-icon">
                <Shield size={32} />
              </div>
              <h3 className="advantage-title">Seguridad</h3>
              <p className="advantage-text">
                Rutas planificadas con guías experimentadas. Nunca caminas sola.
              </p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <Users size={32} />
              </div>
              <h3 className="advantage-title">Comunidad</h3>
              <p className="advantage-text">
                Conoce mujeres increíbles que comparten tu pasión por la naturaleza.
              </p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <Mountain size={32} />
              </div>
              <h3 className="advantage-title">Experiencias Únicas</h3>
              <p className="advantage-text">
                Desde hikes locales hasta viajes internacionales como la Aurora Boreal.
              </p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <Heart size={32} />
              </div>
              <h3 className="advantage-title">Bienestar</h3>
              <p className="advantage-text">
                Mejora tu salud física y mental mientras disfrutas de la naturaleza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiencias Destacadas */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Experiencias Destacadas</h2>
          <p className="section-subtitle">
            Desde rutas locales en Monterrey hasta expediciones de alta montaña y viajes internacionales
          </p>
          <div className="experiences-grid">
            {experiencias.map((exp, index) => (
              <div key={index} className="experience-card hover-lift">
                <div className="experience-image-container">
                  <img src={exp.imagen} alt={exp.nombre} className="experience-image" />
                  <span className="experience-badge">{exp.nivel}</span>
                  {exp.soldOut && <span className="sold-out-badge">SOLD OUT</span>}
                </div>
                <div className="experience-content">
                  <h3 className="experience-title">{exp.nombre}</h3>
                  <p className="experience-description">{exp.descripcion}</p>
                  <Link to="/rutas" className="experience-link">
                    Ver detalles →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/calendario" className="btn-primary">
              <Calendar size={20} />
              Ver Fechas Disponibles
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Lo que dicen nuestras senderistas</h2>
          <div className="testimonials-grid">
            {testimonios.map((test, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">"{test.texto}"</p>
                <p className="testimonial-author">— {test.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Lista para tu próxima aventura?</h2>
            <p className="cta-text">
              Únete a nosotras y descubre las montañas de una forma segura, divertida y acompañada
            </p>
            <div className="cta-buttons">
              <a
                href="https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
              >
                Inscribirme Ahora
              </a>
              <Link to="/quienes-somos" className="btn-secondary">
                Conocer Más
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;