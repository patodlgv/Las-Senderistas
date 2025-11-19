import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Clock, TrendingUp, MapPin, Calendar } from 'lucide-react';

const Rutas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rutas = [
    {
      nombre: 'Cerro de la Silla',
      descripcion: 'El ícono más emblemático de Monterrey. Esta ruta desafiante te llevará a través de senderos rocosos con pendientes pronunciadas hasta alcanzar vistas panorámicas incomparables de toda la ciudad y sus alrededores.',
      nivel: 'Intermedio-Avanzado',
      altitud: '1,750 m',
      duracion: '5-6 horas',
      desnivel: '+800 m',
      costo: '$400 MXN',
      imagen: '/Images/cerro-silla.jpg'
    },
    {
      nombre: 'La Martha',
      descripcion: 'Una ruta clásica que pone a prueba tu resistencia. Pendientes exigentes y terreno variado te recompensan con vistas espectaculares de la ciudad y el valle. Ideal para quienes buscan un reto moderado.',
      nivel: 'Intermedio',
      altitud: '1,340 m',
      duracion: '4-5 horas',
      desnivel: '+650 m',
      costo: '$400 MXN',
      imagen: '/Images/las-senderistas-nieve.PNG',
    },
    {
      nombre: 'El Chupón',
      descripcion: 'Una montaña icónica con un sendero bien definido. Perfecta para principiantes que quieren iniciarse en el hiking con una experiencia gratificante y vistas hermosas.',
      nivel: 'Principiante-Intermedio',
      altitud: '1,200 m',
      duracion: '3-4 horas',
      desnivel: '+450 m',
      costo: '$400 MXN',
      imagen: '/Images/el-chupon.png'
    },
    {
      nombre: 'Rinos',
      descripcion: 'Una aventura completa que combina senderismo y escalada moderada. Terreno técnico con secciones de roca que requieren uso de manos. Para quienes buscan emoción adicional.',
      nivel: 'Avanzado',
      altitud: '1,450 m',
      duracion: '5-6 horas',
      desnivel: '+700 m',
      costo: '$400 MXN',
      imagen: '/Images/rinos-montañas.jpg'
    },
    {
      nombre: 'Sierra Negra',
      descripcion: 'Expedición de alta montaña al quinto pico más alto de México. Una experiencia transformadora que te llevará al límite físico y mental. Incluye aclimatación, campamento base y equipo especializado.',
      nivel: 'Avanzado',
      altitud: '4,580 m',
      duracion: '2-3 días',
      desnivel: '+1,200 m',
      costo: 'Bajo cotización',
      imagen: '/Images/sierra-negra.jpg',
      especial: true
    },
    {
      nombre: 'Chipinque',
      descripcion: 'Rutas variadas en el emblemático parque nacional. Bosques de pino y encino con múltiples senderos para todos los niveles. Perfecto para disfrutar la naturaleza cerca de la ciudad.',
      nivel: 'Principiante-Intermedio',
      altitud: '2,200 m',
      duracion: '3-4 horas',
      desnivel: '+400 m',
      costo: '$400 MXN',
      imagen: '/Images/chipinque-foto.jpg'
    },
    {
      nombre: 'Estanzuela',
      descripcion: 'Caminata tranquila a través de un hermoso cañón con río y cascadas. Ideal para principiantes o para disfrutar un día relajado en contacto con la naturaleza.',
      nivel: 'Principiante',
      altitud: '800 m',
      duracion: '2-3 horas',
      desnivel: '+200 m',
      costo: '$400 MXN',
      imagen: '/Images/la-eztansuela.jpg'
    },
    {
      nombre: 'La Raya',
      descripcion: 'Ruta moderada con vistas panorámicas del valle. Sendero bien marcado que combina ascenso gradual con secciones planas. Excelente para fortalecer resistencia.',
      nivel: 'Intermedio',
      altitud: '1,500 m',
      duracion: '4 horas',
      desnivel: '+550 m',
      costo: '$400 MXN',
      imagen: '/Images/la-raya4.jpg'
    },
    {
      nombre: 'El Agujerado',
      descripcion: 'Una ruta cercana a Monterrey que combina veredas amplias, cruces de arroyo y una subida final hacia un mirador natural.',
      nivel: 'Intermedio',
      altitud: '700 m',
      duracion: '4-6  horas',
      desnivel: '+250 m',
      costo: '$400 MXN',
      imagen: 'Images/Cerro-del-agujerado-G1.jpg'
    },
    {
      nombre: 'Cueva de la Virgen',
      descripcion: 'Peregrinación y naturaleza en una sola experiencia. Sendero empinado que te lleva a una cueva sagrada con vistas hermosas. Rica en historia y espiritualidad.',
      nivel: 'Principiante-Intermedio',
      altitud: '1,100 m',
      duracion: '3 horas',
      desnivel: '+350 m',
      costo: '$400 MXN',
      imagen: '/Images/cueva-virgen.jpeg'
    },
    {
      nombre: 'Aurora Boreal 2026',
      descripcion: 'Viaje internacional especial para presenciar uno de los fenómenos naturales más hermosos del planeta. Una experiencia única en la vida que combina aventura, naturaleza y compañerismo. Incluye vuelos, alojamiento, guías especializados y todas las actividades.',
      nivel: 'Todas',
      altitud: 'Variable',
      duracion: '7-10 días',
      desnivel: 'N/A',
      costo: 'Bajo cotización',
      imagen: '/Images/aurora-boreal.webp',
      especial: true
    }
  ];

  const getNivelClass = (nivel) => {
    if (nivel.includes('Principiante')) return 'nivel-principiante';
    if (nivel.includes('Intermedio')) return 'nivel-intermedio';
    if (nivel.includes('Avanzado')) return 'nivel-avanzado';
    return 'nivel-todas';
  };

  return (
    <div className="rutas-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Rutas y Experiencias</h1>
          <p className="page-hero-subtitle">
            Desde rutas locales en Monterrey hasta expediciones de alta montaña y viajes internacionales
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-banner">
        <div className="container">
          <div className="info-content">
            <div className="info-item">
              <Clock size={24} />
              <div>
                <div className="info-label">Horario estándar</div>
                <div className="info-value">6:30 am - 10:30 am</div>
              </div>
            </div>
            <div className="info-item">
              <MapPin size={24} />
              <div>
                <div className="info-label">Ubicación</div>
                <div className="info-value">Monterrey, N.L.</div>
              </div>
            </div>
            <div className="info-item">
              <TrendingUp size={24} />
              <div>
                <div className="info-label">Todos los niveles</div>
                <div className="info-value">Principiante a Avanzado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rutas Grid */}
      <section className="rutas-section">
        <div className="container">
          <div className="rutas-grid">
            {rutas.map((ruta, index) => (
              <div key={index} className={`ruta-card hover-lift ${ruta.especial ? 'ruta-especial' : ''}`}>
                {ruta.especial && <div className="especial-badge">Experiencia Especial</div>}
                <div className="ruta-image-container">
                  <img src={ruta.imagen} alt={ruta.nombre} className="ruta-image" />
                  <span className={`ruta-nivel-badge ${getNivelClass(ruta.nivel)}`}>{ruta.nivel}</span>
                </div>
                <div className="ruta-content">
                  <h3 className="ruta-nombre">{ruta.nombre}</h3>
                  <p className="ruta-descripcion">{ruta.descripcion}</p>
                  <div className="ruta-details">
                    <div className="detail-item">
                      <Mountain size={16} />
                      <span>{ruta.altitud}</span>
                    </div>
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{ruta.duracion}</span>
                    </div>
                    <div className="detail-item">
                      <TrendingUp size={16} />
                      <span>{ruta.desnivel}</span>
                    </div>
                  </div>
                  <div className="ruta-footer">
                    <div className="ruta-precio">{ruta.costo}</div>
                    <a
                      href={`https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme%20al%20hike%20de%20${encodeURIComponent(ruta.nombre)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-small"
                    >
                      Reservar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <p className="cta-text-large">
              ¿No sabes cuál ruta elegir? Contáctanos y te ayudamos a encontrar la perfecta para ti
            </p>
            <Link to="/calendario" className="btn-cta">
              <Calendar size={20} />
              Ver Calendario de Hikes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rutas;