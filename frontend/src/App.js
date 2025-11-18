import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Rutas from './pages/Rutas';
import Calendario from './pages/Calendario';
import Registro from './pages/Registro';
import Galeria from './pages/Galeria';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;