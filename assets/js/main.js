document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SELECTOR DE TEMA (Modo Claro / Oscuro)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ==========================================
    // 2. CONTADOR REGRESIVO A FECHA REAL DEL EVENTO
    // ==========================================
    // Fecha oficial del evento: 25 de Noviembre de 2026 a las 09:00:00 AM
    const eventDate = new Date("2026-11-25T09:00:00").getTime();

    // Soportar tanto los IDs nuevos como los del index original
    const daysEl = document.getElementById('days') || document.getElementById('cd-days');
    const hoursEl = document.getElementById('hours') || document.getElementById('cd-hours');
    const minutesEl = document.getElementById('minutes') || document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('seconds') || document.getElementById('cd-seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance <= 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';

            const titleEl = document.querySelector('.countdown-section h3') || document.querySelector('.countdown-container h2');
            if (titleEl) titleEl.textContent = '¡El evento ha comenzado!';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const formatTime = (time) => time < 10 ? `0${time}` : time;

        if (daysEl) daysEl.textContent = formatTime(days);
        if (hoursEl) hoursEl.textContent = formatTime(hours);
        if (minutesEl) minutesEl.textContent = formatTime(minutes);
        if (secondsEl) secondsEl.textContent = formatTime(seconds);
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ==========================================
    // 3. FILTRADO INTERACTIVO DE CATEGORÍAS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryCards = document.querySelectorAll('.category-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                categoryCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 4. VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
    // ==========================================
    const form = document.getElementById('register-form');
    if (form) {
        const nombreInput = document.getElementById('nombre');
        const correoInput = document.getElementById('correo');
        const proyectoInput = document.getElementById('proyecto');
        const categoriaSelect = document.getElementById('categoria-select');
        const feedbackDiv = document.getElementById('form-feedback');

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|edu\.mx|com)$/i;

        function validateInput(input, errorElement, validationFn, errorMessage) {
            if (!input || !errorElement) return true;
            if (!validationFn(input.value.trim())) {
                errorElement.textContent = errorMessage;
                input.style.borderColor = '#d90429';
                return false;
            } else {
                errorElement.textContent = '';
                input.style.borderColor = '#2b9348';
                return true;
            }
        }

        if (nombreInput) {
            nombreInput.addEventListener('input', () => {
                validateInput(nombreInput, document.getElementById('error-nombre'),
                    val => val.length >= 3, 'El nombre debe tener al menos 3 caracteres.');
            });
        }

        if (correoInput) {
            correoInput.addEventListener('input', () => {
                validateInput(correoInput, document.getElementById('error-correo'),
                    val => emailRegex.test(val), 'Ingrese un correo institucional válido (.edu.mx).');
            });
        }

        if (proyectoInput) {
            proyectoInput.addEventListener('input', () => {
                validateInput(proyectoInput, document.getElementById('error-proyecto'),
                    val => val.length >= 3, 'El nombre del proyecto es obligatorio.');
            });
        }

        if (categoriaSelect) {
            categoriaSelect.addEventListener('change', () => {
                validateInput(categoriaSelect, document.getElementById('error-categoria'),
                    val => val !== '', 'Debe seleccionar una categoría.');
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNombreValid = validateInput(nombreInput, document.getElementById('error-nombre'),
                val => val.length >= 3, 'El nombre debe tener al menos 3 caracteres.');

            const isCorreoValid = validateInput(correoInput, document.getElementById('error-correo'),
                val => emailRegex.test(val), 'Ingrese un correo institucional válido (.edu.mx).');

            const isProyectoValid = validateInput(proyectoInput, document.getElementById('error-proyecto'),
                val => val.length >= 3, 'El nombre del proyecto es obligatorio.');

            const isCategoriaValid = validateInput(categoriaSelect, document.getElementById('error-categoria'),
                val => val !== '', 'Debe seleccionar una categoría.');

            if (isNombreValid && isCorreoValid && isProyectoValid && isCategoriaValid) {
                feedbackDiv.style.color = '#2b9348';
                feedbackDiv.textContent = '¡Registro exitoso! Nos pondremos en contacto pronto.';
                form.reset();

                [nombreInput, correoInput, proyectoInput, categoriaSelect].forEach(input => {
                    if (input) input.style.borderColor = 'var(--border-color)';
                });

                setTimeout(() => {
                    feedbackDiv.textContent = '';
                }, 5000);
            } else {
                feedbackDiv.style.color = '#d90429';
                feedbackDiv.textContent = 'Por favor, corrige los errores en el formulario antes de enviar.';
            }
        });
    }
});