import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, Send, MapPin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    // Abrir WhatsApp con el mensaje
    const mensaje = `Hola! Soy ${formData.nombre}.\n\nCorreo: ${formData.correo}\n\nMensaje: ${formData.mensaje}`;
    window.open(`https://wa.me/528135688611?text=${encodeURIComponent(mensaje)}`, '_blank');

    // Limpiar formulario
    setFormData({ nombre: '', correo: '', mensaje: '' });
    
    toast({
      title: "Éxito",
      description: "Redirigiendo a WhatsApp..."
    });
  };

  return (
    <div className="contacto-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Contacto</h1>
          <p className="page-hero-subtitle">
            ¿Tienes dudas? Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="contacto-info-section">
        <div className="container">
          <div className="contacto-intro">
            <h2 className="section-title">Contáctanos</h2>
            <p className="contacto-text">
              Si tienes dudas sobre nuestros hikes, quieres más información sobre alguna ruta específica, o simplemente quieres conocer más sobre nuestra comunidad, no dudes en escribirnos. Respondemos todas las consultas.
            </p>
            <p className="contacto-text">
              <strong>Recuerda:</strong> Todos nuestros hikes locales en Monterrey tienen un costo estándar de $400 MXN por persona. Para viajes especiales como Sierra Negra o Aurora Boreal 2026, el costo es bajo cotización personalizada.
            </p>
          </div>

          <div className="contacto-layout">
            {/* Contact Methods */}
            <div className="contact-methods">
              <h3 className="contact-methods-title">Formas de contacto</h3>
              
              <div className="contact-method-card">
                <div className="contact-method-icon whatsapp">
                  <MessageCircle size={28} />
                </div>
                <div className="contact-method-content">
                  <h4 className="contact-method-title">WhatsApp (Preferido)</h4>
                  <p className="contact-method-text">La forma más rápida de inscribirte y resolver tus dudas</p>
                  <a
                    href="https://wa.me/528135688611?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method-link"
                  >
                    +52 813 568 8611
                  </a>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="contact-method-icon phone">
                  <Phone size={28} />
                </div>
                <div className="contact-method-content">
                  <h4 className="contact-method-title">Teléfono</h4>
                  <p className="contact-method-text">Llámanos directamente</p>
                  <a href="tel:+528119176335" className="contact-method-link">
                    +52 811 917 6335
                  </a>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="contact-method-icon email">
                  <Mail size={28} />
                </div>
                <div className="contact-method-content">
                  <h4 className="contact-method-title">Email</h4>
                  <p className="contact-method-text">Envíanos un correo electrónico</p>
                  <a href="mailto:patyfrizzi@yahoo.com.mx" className="contact-method-link">
                    patyfrizzi@yahoo.com.mx
                  </a>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="contact-method-icon location">
                  <MapPin size={28} />
                </div>
                <div className="contact-method-content">
                  <h4 className="contact-method-title">Ubicación</h4>
                  <p className="contact-method-text">Monterrey, Nuevo León, México</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h3 className="contact-form-title">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="correo" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="¿En qué podemos ayudarte?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="btn-cta btn-full">
                  <Send size={20} />
                  Enviar por WhatsApp
                </button>

                <p className="form-note">
                  Al enviar, se abrirá WhatsApp con tu mensaje prellenado para una comunicación más rápida.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4 className="faq-question">¿Cuánto cuesta participar?</h4>
              <p className="faq-answer">
                Los hikes locales en Monterrey tienen un costo de $400 MXN por persona. Este costo incluye guía experimentada, seguridad y acompañamiento durante todo el recorrido.
              </p>
            </div>
            <div className="faq-item">
              <h4 className="faq-question">¿Cuál es el horario de los hikes?</h4>
              <p className="faq-answer">
                El horario estándar es de 6:30 am a 10:30 am. Comenzamos temprano para evitar el calor del mediodía y disfrutar las mejores vistas.
              </p>
            </div>
            <div className="faq-item">
              <h4 className="faq-question">¿Necesito experiencia previa?</h4>
              <p className="faq-answer">
                No necesariamente. Tenemos rutas para todos los niveles, desde principiantes hasta avanzadas. Te ayudamos a elegir la ruta adecuada según tu condición física.
              </p>
            </div>
            <div className="faq-item">
              <h4 className="faq-question">¿Cómo me inscribo?</h4>
              <p className="faq-answer">
                Es muy sencillo: revisa nuestro calendario, elige la fecha y ruta que te interesa, y envíanos un mensaje por WhatsApp. Te confirmaremos tu lugar y te daremos toda la información necesaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Lista para comenzar?</h2>
            <p className="cta-text">
              Escríbenos y te ayudaremos a elegir tu primer hike
            </p>
            <a
              href="https://wa.me/528135688611?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              <MessageCircle size={20} />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;