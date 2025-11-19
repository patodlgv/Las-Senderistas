import React, { useEffect } from 'react';
import { Check, MessageCircle } from 'lucide-react';

const Registro = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pasos = [
    {
      numero: '1',
      titulo: 'Elige tu hike',
      descripcion: 'Revisa nuestro catálogo de rutas y selecciona la que mejor se adapte a tu nivel y preferencias. Tenemos opciones para principiantes, intermedias y avanzadas.'
    },
    {
      numero: '2',
      titulo: 'Revisa el calendario',
      descripcion: 'Consulta las fechas disponibles en nuestro calendario. Organizamos hikes cada semana en diferentes rutas para que siempre tengas opciones.'
    },
    {
      numero: '3',
      titulo: 'Reserva por WhatsApp',
      descripcion: 'Envíanos un mensaje por WhatsApp con la ruta y fecha que elegiste. Te confirmaremos tu lugar y te daremos toda la información necesaria.'
    },
    {
      numero: '4',
      titulo: '¡Nos vemos en la montaña!',
      descripcion: 'El día del hike, nos encontramos en el punto de reunión acordado. Llegaremos juntas a la cumbre y disfrutaremos de la experiencia.'
    }
  ];

  const incluye = [
    'Guías experimentadas en cada hike',
    'Grupo de apoyo durante todo el recorrido',
    'Seguridad y acompañamiento constante',
    'Comunidad activa en WhatsApp',
    'Material educativo sobre hiking',
    'Ambiente seguro y motivador'
  ];

  return (
    <div className="registro-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Unirse a Las Senderistas</h1>
          <p className="page-hero-subtitle">
            Una comunidad segura y acompañada para que cualquier mujer pueda descubrir el hiking
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h2 className="section-title">¿Por qué Las Senderistas?</h2>
            <p className="intro-text">
              No importa si nunca has hecho hiking o si ya tienes experiencia. En Las Senderistas encontrarás un espacio seguro donde puedes empezar, crecer y disfrutar de las montañas acompañada de mujeres increíbles que comparten tu pasión.
            </p>
            <p className="intro-text">
              Somos una comunidad unida por el amor a la naturaleza, la determinación y el apoyo mutuo. Aquí nadie se queda atrás, todas nos motivamos y celebramos cada logro juntas.
            </p>
          </div>
        </div>
      </section>

      {/* Pasos Section */}
      <section className="pasos-section">
        <div className="container">
          <h2 className="section-title">¿Cómo unirme?</h2>
          <div className="pasos-grid">
            {pasos.map((paso, index) => (
              <div key={index} className="paso-card">
                <div className="paso-numero">{paso.numero}</div>
                <h3 className="paso-titulo">{paso.titulo}</h3>
                <p className="paso-descripcion">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incluye Section */}
      <section className="incluye-section">
        <div className="container">
          <h2 className="section-title">Qué incluye ser parte de Las Senderistas</h2>
          <div className="incluye-grid">
            {incluye.map((item, index) => (
              <div key={index} className="incluye-item">
                <Check size={24} className="incluye-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-card">
            <h3 className="pricing-title">Inversión por Hike</h3>
            <div className="pricing-amount">$400 <span>MXN</span></div>
            <p className="pricing-description">
              Incluye guía experimentada, seguridad, acompañamiento durante todo el hike y acceso a la comunidad.
            </p>
            <ul className="pricing-features">
              <li>Horario: 6:30 am - 10:30 am</li>
              <li>Rutas locales en Monterrey</li>
              <li>Todos los niveles</li>
              <li>Grupos reducidos</li>
            </ul>
            <p className="pricing-note">
              <strong>Viajes especiales:</strong> Para expediciones como Sierra Negra o Aurora Boreal 2026, el costo es bajo cotización personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Lista para tu primera aventura?</h2>
            <p className="cta-text">
              Únete a nosotras y descubre tu fuerza interior en las montañas de Monterrey
            </p>
            <a
              href="https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              <MessageCircle size={20} />
              Unirme por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registro;