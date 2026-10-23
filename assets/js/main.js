document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SELECTOR DE TEMA (Modo Claro / Oscuro)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
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

    // ==========================================
    // 2. CONTADOR REGRESIVO DINÁMICO
    // ==========================================
    // Fecha objetivo: 30 días a partir de la fecha actual
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const currentTime = new Date();
        const difference = targetDate - currentTime;

        if (difference <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? `0${days}` : days;
        hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
        minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ==========================================
    // 3. FILTRADO INTERACTIVO DE CATEGORÍAS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryCards = document.querySelectorAll('.category-card');

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

    // ==========================================
    // 4. VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
    // ==========================================
    const form = document.getElementById('register-form');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const proyectoInput = document.getElementById('proyecto');
    const categoriaSelect = document.getElementById('categoria-select');
    const feedbackDiv = document.getElementById('form-feedback');

    // Regex para validar correo institucional (.edu.mx o dominio académico)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|edu\.mx|com)$/i;

    function validateInput(input, errorElement, validationFn, errorMessage) {
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

    // Validaciones en tiempo real (evento input y blur)
    nombreInput.addEventListener('input', () => {
        validateInput(nombreInput, document.getElementById('error-nombre'),
            val => val.length >= 3, 'El nombre debe tener al menos 3 caracteres.');
    });

    correoInput.addEventListener('input', () => {
        validateInput(correoInput, document.getElementById('error-correo'),
            val => emailRegex.test(val), 'Ingrese un correo institucional válido (.edu.mx).');
    });

    proyectoInput.addEventListener('input', () => {
        validateInput(proyectoInput, document.getElementById('error-proyecto'),
            val => val.length >= 3, 'El nombre del proyecto es obligatorio.');
    });

    categoriaSelect.addEventListener('change', () => {
        validateInput(categoriaSelect, document.getElementById('error-categoria'),
            val => val !== '', 'Debe seleccionar una categoría.');
    });

    // Envío del Formulario
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

            // Limpiar los colores de borde
            [nombreInput, correoInput, proyectoInput, categoriaSelect].forEach(input => {
                input.style.borderColor = 'var(--border-color)';
            });

            setTimeout(() => {
                feedbackDiv.textContent = '';
            }, 5000);
        } else {
            feedbackDiv.style.color = '#d90429';
            feedbackDiv.textContent = 'Por favor, corrige los errores en el formulario antes de enviar.';
        }
    });
});