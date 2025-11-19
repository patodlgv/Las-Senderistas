# Las Senderistas - Sitio Web Oficial

Sitio web completo para Las Senderistas, una comunidad de mujeres que hacen hiking en Monterrey, México.

## 🏔️ Características

### Secciones del Sitio
- **Home**: Hero section con CTA, ventajas, experiencias destacadas y testimonios
- **Quiénes Somos**: Historia, valores, misión y estadísticas del grupo
- **Rutas y Experiencias**: 11 rutas detalladas con información completa
  - Cerro de la Silla
  - La Martha
  - El Chupón
  - Rinos
  - Sierra Negra (4,580 m)
  - Chipinque
  - Estanzuela
  - La Raya
  - Teléfrico
  - Cueva de la Virgen
  - Aurora Boreal 2026
- **Calendario**: Calendario interactivo con próximos hikes
- **Registro/Unirse**: Proceso paso a paso para unirse
- **Galería**: Fotos de las experiencias del grupo
- **Blog**: Artículos educativos sobre hiking
- **Contacto**: Formulario y métodos de contacto

### Funcionalidades
- ✅ Calendario interactivo con fechas de hikes
- ✅ Botones de WhatsApp para inscripciones directas (+52 81 1917 6335)
- ✅ Responsive design (móvil, tablet, desktop)
- ✅ Logo oficial integrado
- ✅ Diseño profesional siguiendo las design guidelines
- ✅ Navegación fixed con scroll

## 🎨 Diseño

### Colores de Marca
- **Principal**: #05989e (Turquesa)
- **Oscuro**: #004534 (Verde oscuro)
- **Hover**: #0C6951 (Verde medio)
- **Footer**: Blanco (NO usa color de marca)

### Tipografía
- Familia: Inter
- Sistema responsive con clamp()

### Componentes
- Botones pill shape (border-radius: 25px)
- Tarjetas con sombras sutiles
- Animaciones hover suaves
- Badges de nivel de dificultad con colores específicos

## 📱 Contacto

### Información de Contacto
- **WhatsApp Principal**: +52 811 917 6335
- **Teléfono**: +52 811 917 6335
- **Email**: patyfrizzi@yahoo.com.mx
- **Instagram**: @lassenderistas
- **Ubicación**: Monterrey, Nuevo León, México

### Horarios y Precios
- **Horario estándar**: 6:30 am - 10:30 am
- **Costo hikes locales**: $400 MXN
- **Viajes especiales**: Bajo cotización

## 🚀 Tecnologías

- React 19
- React Router DOM 7
- Shadcn UI Components
- Lucide React Icons
- Date-fns para manejo de fechas
- Tailwind CSS
- CSS Variables para theming

## 📂 Estructura de Archivos

```
/app/frontend/src/
├── App.js                      # Configuración de rutas
├── App.css                     # Estilos principales
├── pages-styles.css            # Estilos de páginas específicas
├── components/
│   ├── Navbar.jsx             # Navegación principal
│   ├── Footer.jsx             # Footer del sitio
│   └── ui/                    # Componentes Shadcn UI
├── pages/
│   ├── Home.jsx               # Página principal
│   ├── QuienesSomos.jsx       # Sobre el grupo
│   ├── Rutas.jsx              # Catálogo de rutas
│   ├── Calendario.jsx         # Calendario de hikes
│   ├── Registro.jsx           # Proceso de inscripción
│   ├── Galeria.jsx            # Galería de fotos
│   ├── Blog.jsx               # Blog y artículos
│   └── Contacto.jsx           # Página de contacto
└── hooks/
    └── use-toast.js           # Hook para notificaciones
```

## ✨ Características Destacadas

1. **Logo Oficial**: Integrado en navbar y footer
2. **WhatsApp Integration**: Todos los botones de "Reservar" e "Inscribirse" abren WhatsApp con mensaje prellenado
3. **Calendario Interactivo**: Usa Shadcn Calendar con fechas highlighteadas
4. **Diseño Profesional**: Siguiendo las Network Design Guidelines
5. **SEO Friendly**: Estructura semántica HTML5
6. **Accesibilidad**: Botones con tamaños mínimos (48px), contraste adecuado
7. **Performance**: Imágenes optimizadas, lazy loading

## 📋 Notas Importantes

- **NO se incluyeron fotos de Halloween** según instrucciones
- **Footer usa fondo blanco**, NO el color de marca
- **Calendario tiene funcionalidad de WhatsApp** en cada fecha
- **Todas las rutas mencionadas están implementadas** con información real
- **Diseño responsive** verificado en móvil, tablet y desktop
- **Botones pill shape** (border-radius: 25-33px) según guidelines

## 🔄 Próximos Pasos Sugeridos

1. **Backend**: Implementar sistema de gestión de fechas dinámico
2. **Admin Panel**: Panel para agregar/editar hikes y fechas
3. **Blog**: Sistema de CMS para artículos
4. **Galería**: Integración directa con Instagram API
5. **Notificaciones**: Sistema de recordatorios por WhatsApp/Email
6. **Pagos**: Integración de pagos en línea

## 📸 Screenshots

El sitio está completamente funcional y listo para usar. Todas las páginas están implementadas con contenido completo en español.

---

**Desarrollado para Las Senderistas - Comunidad de Mujeres que Aman las Montañas** 🏔️💚
