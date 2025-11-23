import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Plane, Mountain } from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarioPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState('hikes'); // 'hikes' o 'viajes'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data: Fechas que tienen actividad para marcar en el calendario pequeño
  const hikesData = {
    // Noviembre 2025
    '2025-11-23': { nombre: 'Escaleras' },
    '2025-11-27': { nombre: 'Calabaceñas' },
    '2025-11-29': { nombre: 'Observatorio Chipinque' },
    '2025-11-30': { nombre: 'Rayita' },
    // Puedes añadir las fechas de 2026 aquí si quieres que se marquen también
  };

  const handleDateSelect = (date) => {
    if (date) {
      const dateKey = format(date, 'yyyy-MM-dd');
      if (hikesData[dateKey]) {
        const hike = hikesData[dateKey];
        const message = `Hola! quiero inscribirme al hike o experiencia de ${hike.nombre} el ${format(date, "d 'de' MMMM", { locale: es })}`;
        window.open(`https://wa.me/528119176335?text=${encodeURIComponent(message)}`, '_blank');
      }
    }
  };

  const modifiers = {
    hike: Object.keys(hikesData).map(dateStr => new Date(dateStr))
  };

  // --- ESTILO DEL CALENDARIO MODIFICADO ---
  // Sin círculo, solo letras azules y negritas.
  const modifiersStyles = {
    hike: {
      backgroundColor: 'transparent', // Fondo transparente
      border: 'none', // Sin bordes
      color: '#05989e', // Color turquesa marca
      fontWeight: '900', // Negrita extra fuerte
      textDecoration: 'underline', // Opcional: subrayado sutil para resaltar más
      fontSize: '1.1em'
    }
  };

  // BASE DE DATOS COMPLETA
  const todosLosEventos = [
    // --- NOVIEMBRE 2025 (Faltantes agregados) ---
    { categoria: 'hikes', fecha: '23 de Noviembre', fechaISO: '2025-11-23', nombre: 'Escaleras', nivel: 'Principiante-Intermedio' },
    { categoria: 'hikes', fecha: '27 de Noviembre', fechaISO: '2025-11-27', nombre: 'Calabaceñas', nivel: 'Intermedio' },
    { categoria: 'hikes', fecha: '29 de Noviembre', fechaISO: '2025-11-29', nombre: 'Observatorio Chipinque', nivel: 'Avanzado' },
    { categoria: 'hikes', fecha: '30 de Noviembre', fechaISO: '2025-11-30', nombre: 'Rayita', nivel: 'Intermedio' },

    // --- VIAJES 2026 ---
    { categoria: 'viaje', fecha: 'Enero 2026', fechaISO: '2026-01-01', nombre: 'Caminata Nevado-Valle', nivel: 'Intermedio', soldOut: true },
    { categoria: 'viaje', fecha: 'Febrero 2026', fechaISO: '2026-02-01', nombre: 'Canadá Auroras Boreales', nivel: 'Todas', soldOut: true },
    { categoria: 'viaje', fecha: 'Abril 2026', fechaISO: '2026-04-01', nombre: 'Peña de Bernal o Tepozteco', nivel: 'Principiante' },
    { categoria: 'viaje', fecha: 'Mayo 2026', fechaISO: '2026-05-01', nombre: 'Perú', nivel: 'Intermedio' },
    { categoria: 'viaje', fecha: 'Agosto 2026', fechaISO: '2026-08-01', nombre: 'Sierra Negra', nivel: 'Avanzado' },
    { categoria: 'viaje', fecha: 'Septiembre 2026', fechaISO: '2026-09-01', nombre: 'Camino de Santiago Otoñal', nivel: 'Intermedio' },
    { categoria: 'viaje', fecha: 'Octubre 2026', fechaISO: '2026-10-01', nombre: 'Islandia', nivel: 'Todas' }
  ];

  // 1. Filtro de fechas pasadas (Se auto-eliminan si la fecha ya pasó)
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Resetear hora para comparar solo fechas
  
  const eventosFuturos = todosLosEventos.filter(evento => {
    // Ajustamos la fechaISO agregando hora para evitar problemas de zona horaria que oculten eventos de "hoy"
    const fechaEvento = new Date(evento.fechaISO + 'T00:00:00');
    return fechaEvento >= hoy;
  });

  // 2. Filtro por pestaña activa
  const listaVisualizar = eventosFuturos.filter(evento => evento.categoria === activeTab);

  return (
    <div className="calendario-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Calendario de Hikes</h1>
          <p className="page-hero-subtitle">
            Selecciona una fecha para inscribirte. Todos los hikes inician a las 6:30 am
          </p>
        </div>
      </section>

      <section className="info-banner">
        <div className="container">
          <div className="info-content centered">
            <div className="info-item">
              <Clock size={24} />
              <div>
                <div className="info-label">Horario</div>
                <div className="info-value">6:30 am - 10:30 am</div>
              </div>
            </div>
            <div className="info-item">
              <MapPin size={24} />
              <div>
                <div className="info-label">Costo</div>
                <div className="info-value">$400 MXN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="calendario-section">
        <div className="container">
          <div className="calendario-layout">
            {/* Calendar */}
            <div className="calendario-card">
              <h2 className="calendario-card-title">Selecciona una fecha</h2>
              <p className="calendario-hint">Las fechas resaltadas en azul tienen actividad.</p>
              <div className="calendar-wrapper">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={date}
                  onMonthChange={setDate}
                  locale={es}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  className="custom-calendar"
                />
              </div>
            </div>

            {/* Próximos Eventos con TABS */}
            <div className="proximos-card">
              
              {/* Botones de cambio */}
              <div className="tabs-container">
                <button 
                  className={`tab-button ${activeTab === 'hikes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('hikes')}
                >
                  <Mountain size={18} />
                  Hikes
                </button>
                <button 
                  className={`tab-button ${activeTab === 'viaje' ? 'active' : ''}`}
                  onClick={() => setActiveTab('viaje')}
                >
                  <Plane size={18} />
                  Grandes Viajes
                </button>
              </div>

              <div className="proximos-list">
                {listaVisualizar.map((evento, index) => (
                  <div key={index} className="proximo-item">
                    <div className="proximo-info">
                      <div className="proximo-fecha">{evento.fecha}</div>
                      <div className="proximo-nombre">
                        {evento.nombre}
                        {evento.soldOut && <span className="badge-soldout">SOLD OUT</span>}
                      </div>
                      <div className="proximo-nivel">{evento.nivel}</div>
                    </div>
                    
                    {evento.soldOut ? (
                       <button disabled className="btn-disabled">Agotado</button>
                    ) : (
                      <a
                        href={`https://wa.me/528119176335?text=Hola!%20quiero%20inscribirme%20a%20${encodeURIComponent(evento.nombre)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-small"
                      >
                        Reservar
                      </a>
                    )}
                  </div>
                ))}
                
                {listaVisualizar.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No hay eventos disponibles en esta categoría por el momento.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Instrucciones (TEXTO ACTUALIZADO) */}
          <div className="instrucciones-card">
            <h3 className="instrucciones-title">¿Cómo funciona la reserva?</h3>
            <ol className="instrucciones-list">
              <li>Selecciona la fecha del hike o experiencia que te interesa en el calendario</li>
              <li>Automáticamente se abrirá WhatsApp con un mensaje prellenado</li>
              <li>Envía el mensaje para confirmar tu reserva</li>
              <li>Recibirás información detallada sobre el punto de encuentro y lo que necesitas llevar</li>
              <li>¡Nos vemos en la montaña!</li>
            </ol>
            <p className="instrucciones-note">
              <strong>Nota:</strong> El costo de $400 MXN se confirma al momento de la reserva. Para viajes especiales como Sierra Negra o Aurora Boreal, el costo es bajo cotización personalizada.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarioPage;