import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <img 
              src="https://customer-assets.emergentagent.com/job_hikesisters/artifacts/ouaxnmf2_Logo.png" 
              alt="Las Senderistas Logo" 
              className="footer-logo"
            />
            <p className="footer-description">
              Una comunidad de mujeres que aman las montañas, la naturaleza y las nuevas experiencias.
            </p>
            <div className="footer-social">
              <a 
                href="https://instagram.com/lassenderistas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
              <li><Link to="/rutas">Rutas y Experiencias</Link></li>
              <li><Link to="/calendario">Calendario</Link></li>
              <li><Link to="/galeria">Galería</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contacto</h3>
            <ul className="footer-contact">
              <li>
                <Phone size={16} />
                <a href="tel:+528119176335">+52 811 917 6335</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="https://wa.me/528135688611" target="_blank" rel="noopener noreferrer">
                  +52 813 568 8611
                </a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:patyfrizzi@yahoo.com.mx">patyfrizzi@yahoo.com.mx</a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="footer-section">
            <h3 className="footer-title">Información</h3>
            <ul className="footer-info">
              <li>Hikes semanales en Monterrey</li>
              <li>Horario: 6:30 am - 10:30 am</li>
              <li>Costo: $400 MXN por hike</li>
              <li>Viajes especiales bajo cotización</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Las Senderistas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;