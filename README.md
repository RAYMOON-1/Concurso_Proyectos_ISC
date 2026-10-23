# Concurso de Proyectos ISC - Práctica de Refactorización y Despliegue

Sitio web oficial refactorizado y optimizado para el Concurso de Proyectos de la carrera de Ingeniería en Sistemas Computacionales (ISC).

## 🚀 Sitio Publicado en Producción
- **Enlace del proyecto:** [Ver sitio web publicado](https://tu-usuario.github.io/Concurso_Proyectos_ISC/) *(Coloca aquí tu enlace real)*

---

## 🛠️ Mejoras Realizadas por Ejes Técnicos

### 1. Estructura y Semántica Web (HTML5)
- **Etiquetas Semánticas:** Sustitución total de contenedores genéricos (`<div>`) por elementos semánticos estándar (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- **SEO & Open Graph:** Inclusión de títulos descriptivos, metadatos SEO (`description`, `keywords`) y metadatos Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) para la previsualización en plataformas y redes sociales.
- **Accesibilidad (a11y):** Implementación de textos alternativos (`alt`) explicativos en imágenes, jerarquía clara de títulos (`<h1>`-`<h3>`), etiquetas `<label>` vinculadas para el formulario y soporte de lectores de pantalla.

### 2. Diseño, Maquetación y UX (CSS3)
- **Estrategia Mobile-First:** Maquetación responsiva adaptable desde pantallas de 320px hasta escritorios mediante CSS Grid y Flexbox.
- **Variables CSS:** Uso de variables para la paleta cromática institucional (`--primary-color`, `--secondary-color`, `--accent-color`, etc.).
- **Modo Claro / Modo Oscuro:** Selector de tema dinámico con persistencia de preferencia en `localStorage`.
- **Microinteracciones:** Transiciones suaves en enlaces, filtros y botones mediante estados `:hover` y `:focus`.

### 3. Dinamismo e Interactividad (JavaScript ES6+)
- **Contador Regresivo:** Temporizador en tiempo real calculando días, horas, minutos y segundos faltantes para el evento.
- **Validación de Formulario:** Validación interactiva en tiempo real (`input`/`blur`) garantizando campos obligatorios y formato de correo institucional (`.edu.mx`).
- **Filtro de Categorías:** Manipulación del DOM para filtrar dinámicamente las tarjetas de categorías sin recargar la página.

### 4. Rendimiento y Buenas Prácticas
- **Carga Diferida:** Atributo `loading="lazy"` integrado en las imágenes secundarias.
- **Optimización General:** Código limpio, modular e independiente de librerías pesadas externas.

---

## 💻 Tecnologías Utilizadas
- **HTML5:** Estructura semántica.
- **CSS3:** Flexbox, CSS Grid, Variables CSS y Media Queries.
- **JavaScript (ES6+):** Manipulación del DOM, eventos en tiempo real y almacenamiento local.
- **Git & GitHub:** Control de versiones colaborativo y despliegue a producción con GitHub Pages.

---

## 📸 Capturas de Pantalla (Antes y Después)

### Antes (Base del Repositorio)
*(Agrega aquí una captura del proyecto original)*

### Después (Versión Refactorizada)
*(Agrega aquí capturas del sitio publicado)*