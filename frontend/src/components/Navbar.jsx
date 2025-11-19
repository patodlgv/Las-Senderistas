import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Quiénes Somos', path: '/quienes-somos' },
    { name: 'Rutas', path: '/rutas' },
    { name: 'Calendario', path: '/calendario' },
    { name: 'Galería', path: '/galeria' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="network-header">
      <div className="nav-wrapper">
        <Link to="/" className="network-logo-container">
          <img 
            src="https://customer-assets.emergentagent.com/job_hikesisters/artifacts/ouaxnmf2_Logo.png" 
            alt="Las Senderistas Logo" 
            className="navbar-logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="network-nav desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`network-nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-nav"
          >
            Inscribirme
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme%20a%20este%20hike"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mobile-cta"
            onClick={() => setIsOpen(false)}
          >
            Inscribirme
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;