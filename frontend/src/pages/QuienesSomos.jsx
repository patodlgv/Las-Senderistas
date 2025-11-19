import React, { useEffect } from 'react';
import { Heart, Users, Mountain, Target } from 'lucide-react';

const QuienesSomos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const valores = [
    {
      icon: Heart,
      titulo: 'Sororidad',
      descripcion: 'Creemos en el apoyo mutuo entre mujeres. Aquí encontrarás hermanas de montaña que te impulsan a alcanzar tus metas.'
    },
    {
      icon: Mountain,
      titulo: 'Determinación',
      descripcion: 'Cada cumbre alcanzada es una victoria personal. Te motivamos a superar tus límites y descubrir tu fortaleza interior.'
    },
    {
      icon: Users,
      titulo: 'Comunidad',
      descripcion: 'Más que un grupo de hiking, somos una familia unida por la pasión por la naturaleza y las nuevas experiencias.'
    },
    {
      icon: Target,
      titulo: 'Crecimiento Personal',
      descripcion: 'Cada hike es una oportunidad para conocerte mejor, desafiarte y crecer como persona.'
    }
  ];

  return (
    <div className="quienes-somos-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Quiénes Somos</h1>
          <p className="page-hero-subtitle">
            Una comunidad de mujeres que aman las montañas y las nuevas aventuras
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="story-title">Nuestra Historia</h2>
              <p className="story-paragraph">
                Las Senderistas nació del sueño de crear un espacio seguro y motivador donde las mujeres pudieran descubrir y disfrutar el hiking sin importar su nivel de experiencia. Comenzamos como un pequeño grupo de amigas que compartían la pasión por las montañas, y hoy somos una comunidad vibrante de mujeres que se apoyan, se motivan y crecen juntas.
              </p>
              <p className="story-paragraph">
                Lo que nos une va más allá del deporte: es el amor por la naturaleza, la búsqueda del bienestar personal, y sobre todo, la sororidad. En Las Senderistas, nadie se queda atrás. Cada mujer, sin importar su condición física o experiencia previa, encuentra su lugar y su ritmo.
              </p>
              <p className="story-paragraph">
                Creemos firmemente que las montañas son para todas. Por eso organizamos hikes adaptados a diferentes niveles, desde rutas para principiantes hasta expediciones desafiantes de alta montaña. Nuestro objetivo es que cada mujer que se una a nosotras descubra no solo las bellezas naturales de nuestras montañas, sino también su propia fuerza interior.
              </p>
            </div>
            <div className="story-image">
              <img 
                 src="/Images/Quienes-somos.jpg"  
                alt="Grupo Las Senderistas" 
                className="rounded-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="valores-section">
        <div className="container">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="valores-grid">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon;
              return (
                <div key={index} className="valor-card">
                  <div className="valor-icon">
                    <IconComponent size={36} />
                  </div>
                  <h3 className="valor-titulo">{valor.titulo}</h3>
                  <p className="valor-descripcion">{valor.descripcion}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-image">
              <img 
                src="/Images/quienes-dos.jpg"
                alt="Celebración en la cumbre" 
                className="rounded-image"
              />
            </div>
            <div className="mission-text">
              <h2 className="mission-title">Nuestra Misión</h2>
              <p className="mission-paragraph">
                Crear un espacio inclusivo donde cada mujer pueda explorar las montañas con seguridad, confianza y alegría. Queremos inspirarte a salir de tu zona de confort, conectar con la naturaleza y descubrir todo lo que eres capaz de lograr.
              </p>
              <p className="mission-paragraph">
                No importa si nunca has puesto un pie en una montaña o si ya eres una experta: aquí todas somos bienvenidas. Te acompañamos en cada paso, celebramos tus logros y te motivamos en los momentos difíciles.
              </p>
              <div className="mission-stats">
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Hikes Realizados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Senderistas Activas</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Rutas Diferentes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Lista para unirte?</h2>
            <p className="cta-text">
              Sé parte de esta increíble comunidad de mujeres que se apoyan, se inspiran y comparten la pasión por las montañas
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

export default QuienesSomos;