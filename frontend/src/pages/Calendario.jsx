import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarioPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data - fechas con hikes programados
  const hikesData = {
    '2025-08-15': { nombre: 'Cerro de la Silla', hora: '6:30 am' },
    '2025-08-17': { nombre: 'La Martha', hora: '6:30 am' },
    '2025-08-22': { nombre: 'Chipinque', hora: '6:30 am' },
    '2025-08-24': { nombre: 'El Chupón', hora: '6:30 am' },
    '2025-08-29': { nombre: 'Rinos', hora: '6:30 am' },
    '2025-08-31': { nombre: 'La Raya', hora: '6:30 am' },
  };

  const handleDateSelect = (date) => {
    if (date) {
      const dateKey = format(date, 'yyyy-MM-dd');
      if (hikesData[dateKey]) {
        const hike = hikesData[dateKey];
        const message = `Hola! quiero inscribirme al hike de ${hike.nombre} el ${format(date, "d 'de' MMMM", { locale: es })}`;
        window.open(`https://wa.me/528135688611?text=${encodeURIComponent(message)}`, '_blank');
      }
    }
  };

  const modifiers = {
    hike: Object.keys(hikesData).map(dateStr => new Date(dateStr))
  };

  const modifiersStyles = {
    hike: {
      backgroundColor: '#05989e',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '8px'
    }
  };

  const proximos = [
    { fecha: '15 de Agosto', nombre: 'Cerro de la Silla', nivel: 'Intermedio-Avanzado' },
    { fecha: '17 de Agosto', nombre: 'La Martha', nivel: 'Intermedio' },
    { fecha: '22 de Agosto', nombre: 'Chipinque', nivel: 'Principiante' },
    { fecha: '24 de Agosto', nombre: 'El Chupón', nivel: 'Principiante-Intermedio' },
    { fecha: '29 de Agosto', nombre: 'Rinos', nivel: 'Avanzado' },
    { fecha: '31 de Agosto', nombre: 'La Raya', nivel: 'Intermedio' }
  ];

  return (
    <div className="calendario-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Calendario de Hikes</h1>
          <p className="page-hero-subtitle">
            Selecciona una fecha para inscribirte. Todos los hikes inician a las 6:30 am
          </p>
        </div>
      </section>

      {/* Info Banner */}
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

      {/* Calendar and List */}
      <section className="calendario-section">
        <div className="container">
          <div className="calendario-layout">
            {/* Calendar */}
            <div className="calendario-card">
              <h2 className="calendario-card-title">Selecciona una fecha</h2>
              <p className="calendario-hint">Las fechas en color turquesa tienen hikes programados. Haz clic para inscribirte.</p>
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

            {/* Proximos Hikes */}
            <div className="proximos-card">
              <h2 className="calendario-card-title">Próximos Hikes</h2>
              <div className="proximos-list">
                {proximos.map((hike, index) => (
                  <div key={index} className="proximo-item">
                    <div className="proximo-info">
                      <div className="proximo-fecha">{hike.fecha}</div>
                      <div className="proximo-nombre">{hike.nombre}</div>
                      <div className="proximo-nivel">{hike.nivel}</div>
                    </div>
                    <a
                      href={`https://wa.me/528135688611?text=Hola!%20quiero%20inscribirme%20al%20hike%20de%20${encodeURIComponent(hike.nombre)}%20el%20${encodeURIComponent(hike.fecha)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-small"
                    >
                      Reservar
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="instrucciones-card">
            <h3 className="instrucciones-title">¿Cómo funciona la reserva?</h3>
            <ol className="instrucciones-list">
              <li>Selecciona la fecha del hike que te interesa en el calendario</li>
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