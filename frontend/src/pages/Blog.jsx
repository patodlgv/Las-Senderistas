import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articulos = [
    {
      id: 1,
      titulo: 'Cómo prepararte para tu primer Hike',
      resumen: 'Guía completa para principiantes: qué llevar, cómo entrenar y qué esperar en tu primera aventura en la montaña.',
      autor: 'Las Senderistas',
      fecha: '10 de Agosto, 2025',
      tiempo: '5 min',
      imagen: 'https://images.unsplash.com/photo-1758599668974-6da5d7cc6cc4',
      contenido: `
        <h3>Bienvenida al mundo del hiking</h3>
        <p>Hacer tu primer hike puede parecer intimidante, pero con la preparación adecuada, será una experiencia increíble. Aquí te compartimos todo lo que necesitas saber.</p>
        
        <h3>Equipo básico</h3>
        <ul>
          <li><strong>Calzado:</strong> Botas o tenis de senderismo con buen agarre y soporte de tobillo</li>
          <li><strong>Ropa:</strong> Ropa cómoda en capas, evita el algodón</li>
          <li><strong>Mochila:</strong> 20-30 litros es suficiente para hikes de un día</li>
          <li><strong>Agua:</strong> Mínimo 2 litros</li>
          <li><strong>Snacks:</strong> Fruta, frutos secos, barras energéticas</li>
          <li><strong>Protección solar:</strong> Bloqueador, gorra, lentes de sol</li>
        </ul>

        <h3>Preparación física</h3>
        <p>No necesitas ser atleta, pero es recomendable:</p>
        <ul>
          <li>Caminar regularmente (30 minutos diarios)</li>
          <li>Subir escaleras para fortalecer piernas</li>
          <li>Hacer ejercicios de cardio 2-3 veces por semana</li>
        </ul>

        <h3>Durante el hike</h3>
        <ul>
          <li>Empieza temprano para evitar el calor del mediodía</li>
          <li>Mantén un ritmo constante, no te apresures</li>
          <li>Hidrátate constantemente</li>
          <li>Escucha a tu cuerpo y comunícalo al grupo</li>
          <li>Disfruta el paisaje y la compañía</li>
        </ul>

        <h3>Consejos finales</h3>
        <p>En Las Senderistas siempre tenemos guías experimentadas que te acompañan y apoyan durante todo el recorrido. No tengas miedo de pedir ayuda o hacer preguntas. ¡Todas empezamos algún día!</p>
      `
    },
    {
      id: 2,
      titulo: 'Equipo recomendado para las montañas de Monterrey',
      resumen: 'Todo lo que necesitas saber sobre el equipo esencial para hacer hiking en las montañas de nuestra región.',
      autor: 'Las Senderistas',
      fecha: '5 de Agosto, 2025',
      tiempo: '7 min',
      imagen: 'https://images.unsplash.com/photo-1568987241598-6155c31740f2',
      contenido: `
        <h3>Equipo esencial para Monterrey</h3>
        <p>Las montañas de Monterrey tienen características particulares: clima seco, sol intenso, terreno rocoso y temperaturas variables. Aquí te decimos qué necesitas.</p>
        
        <h3>Calzado</h3>
        <p><strong>Fundamental:</strong> Invierte en buen calzado. Nuestras rutas son rocosas y necesitas:</p>
        <ul>
          <li>Suela con buen agarre (Vibram es excelente)</li>
          <li>Soporte de tobillo (bota media o alta)</li>
          <li>Resistencia al agua (para la temporada de lluvia)</li>
          <li>Amortiguación adecuada</li>
        </ul>

        <h3>Ropa</h3>
        <ul>
          <li><strong>Primera capa:</strong> Ropa deportiva que absorba humedad (no algodón)</li>
          <li><strong>Segunda capa:</strong> Chamarra ligera o sudadera para las mañanas frías</li>
          <li><strong>Pantalones:</strong> Preferiblemente de secado rápido o tipo leggings</li>
          <li><strong>Sombrero/gorra:</strong> Indispensable para el sol</li>
        </ul>

        <h3>Mochila y accesorios</h3>
        <ul>
          <li>Mochila de 20-30L con cinturón de cadera</li>
          <li>Sistema de hidratación o botellas (2-3 litros mínimo)</li>
          <li>Bastones de trekking (muy útiles en descensos)</li>
          <li>Primeros auxilios básicos</li>
          <li>Batería externa para celular</li>
        </ul>

        <h3>Protección solar</h3>
        <p><strong>Crítico en Monterrey:</strong></p>
        <ul>
          <li>Bloqueador solar FPS 50+ (reaplicar cada 2 horas)</li>
          <li>Lentes de sol con protección UV</li>
          <li>Buff o pañuelo para proteger cuello</li>
        </ul>

        <h3>Nutrición e hidratación</h3>
        <ul>
          <li>Agua: Mínimo 2 litros, 3 en verano</li>
          <li>Electrolitos o bebidas deportivas</li>
          <li>Snacks energéticos: frutos secos, barras, frutas</li>
          <li>Comida completa si el hike es largo</li>
        </ul>

        <h3>Recomendaciones finales</h3>
        <p>No necesitas comprar todo de golpe. Empieza con lo básico (buen calzado, mochila, agua) y ve adquiriendo más equipo conforme ganas experiencia. En Las Senderistas siempre compartimos consejos y recomendaciones.</p>
      `
    },
    {
      id: 3,
      titulo: 'Sierra Negra: Nuestra expedición a 4,580 metros',
      resumen: 'La historia de cómo un grupo de Las Senderistas conquistó el quinto pico más alto de México.',
      autor: 'Las Senderistas',
      fecha: '28 de Julio, 2025',
      tiempo: '10 min',
      imagen: 'https://images.unsplash.com/photo-1568987241598-6155c31740f2',
      contenido: `
        <h3>El reto más grande</h3>
        <p>Sierra Negra, con sus 4,580 metros de altitud, representa el quinto pico más alto de México. Para nuestro grupo, fue más que una montaña: fue una prueba de determinación, trabajo en equipo y superación personal.</p>
        
        <h3>La preparación</h3>
        <p>Meses antes del viaje, iniciamos un programa de entrenamiento intensivo:</p>
        <ul>
          <li>Hikes de acondicionamiento cada fin de semana</li>
          <li>Entrenamiento cardiovascular 3-4 veces por semana</li>
          <li>Hikes de aclimatación en montañas más bajas</li>
          <li>Preparación mental y emocional</li>
        </ul>

        <h3>El viaje</h3>
        <p>Llegamos a Puebla y nos dirigimos al punto de partida. La primera noche la pasamos en el campamento base a 3,800 metros. El frío era intenso, pero nuestro ánimo estaba por las nubes.</p>

        <h3>El día cumbre</h3>
        <p>Despertamos a las 3:00 am. El cielo estaba despejado y las estrellas brillaban como nunca habíamos visto. Comenzamos el ascenso en la oscuridad, con solo nuestras lámparas frontales iluminando el camino.</p>
        <p>Cada paso se volvía más pesado por la falta de oxígeno. Pero nos animábamos unas a otras, recordándonos por qué estábamos ahí.</p>

        <h3>La cumbre</h3>
        <p>Después de 6 horas de ascenso, llegamos a la cumbre justo cuando el sol salía. Las lágrimas, los abrazos y las sonrisas no se hicieron esperar. Estábamos en la cima de una de las montañas más altas de México.</p>

        <h3>Aprendizajes</h3>
        <ul>
          <li>La importancia del trabajo en equipo</li>
          <li>Que los límites están en nuestra mente</li>
          <li>El valor de la preparación y la paciencia</li>
          <li>Que juntas podemos lograr lo que parezca imposible</li>
        </ul>

        <h3>Mensaje final</h3>
        <p>Sierra Negra nos enseñó que no hay montaña tan alta que no podamos conquistar cuando nos apoyamos mutuamente. Si estás considerando un reto similar, te invitamos a unirte a nuestra próxima expedición. Juntas somos más fuertes.</p>
      `
    }
  ];

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Blog</h1>
          <p className="page-hero-subtitle">
            Guías, consejos y experiencias de nuestra comunidad
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-section">
        <div className="container">
          <div className="blog-grid">
            {articulos.map((articulo) => (
              <article key={articulo.id} className="blog-card hover-lift">
                <div className="blog-image-container">
                  <img src={articulo.imagen} alt={articulo.titulo} className="blog-image" />
                </div>
                <div className="blog-content">
                  <h2 className="blog-titulo">{articulo.titulo}</h2>
                  <p className="blog-resumen">{articulo.resumen}</p>
                  <div className="blog-meta">
                    <div className="blog-meta-item">
                      <User size={16} />
                      <span>{articulo.autor}</span>
                    </div>
                    <div className="blog-meta-item">
                      <Clock size={16} />
                      <span>{articulo.tiempo} de lectura</span>
                    </div>
                  </div>
                  <div className="blog-footer">
                    <span className="blog-fecha">{articulo.fecha}</span>
                    <Link to={`/blog/${articulo.id}`} className="blog-link">
                      Leer más →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Más Historias Section */}
          <div className="mas-historias">
            <h2 className="section-title">Más Historias</h2>
            <div className="mas-historias-content">
              <div className="mas-historias-image">
                <img 
                  src="https://customer-assets.emergentagent.com/job_hikesisters/artifacts/ouaxnmf2_Logo.png" 
                  alt="Las Senderistas" 
                  className="logo-destacado"
                />
              </div>
              <div className="mas-historias-text">
                <p>
                  Cada semana compartimos nuevas historias, consejos y guías para que disfrutes al máximo tus aventuras en las montañas.
                </p>
                <p>
                  Síguenos en Instagram @lassenderistas para más contenido y actualizaciones de nuestras aventuras.
                </p>
                <a
                  href="https://instagram.com/lassenderistas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Seguir en Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;