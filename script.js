// Lógica de interacciones y animaciones de Gastio
document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos del menú de navegación responsivo
    const botonMenu = document.getElementById('botonMenu');
    const menuNavegacion = document.getElementById('menuNavegacion');
    const enlacesMenu = document.querySelectorAll('.enlace-menu');

    // Función para mostrar u ocultar el menú en dispositivos móviles
    const alternarMenu = () => {
        menuNavegacion.classList.toggle('activa');
        
        // Animar el ícono de hamburguesa para convertirlo en una "X"
        const lineas = botonMenu.querySelectorAll('.linea-menu');
        if (menuNavegacion.classList.contains('activa')) {
            lineas[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lineas[1].style.opacity = '0';
            lineas[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            lineas[0].style.transform = 'none';
            lineas[1].style.opacity = '1';
            lineas[2].style.transform = 'none';
        }
    };

    // Función para cerrar el menú al hacer clic en un enlace
    const cerrarMenu = () => {
        if (menuNavegacion.classList.contains('activa')) {
            alternarMenu();
        }
    };

    // Agregar los eventos a los elementos del menú
    botonMenu.addEventListener('click', alternarMenu);
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', cerrarMenu);
    });

    // Animaciones de Scroll Suave (Intersection Observer)
    const elementosAnimables = document.querySelectorAll('.animar-scroll');

    const configuracionObservador = {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible en pantalla
    };

    const observarScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Agregar la clase que desencadena la animación CSS
                entrada.target.classList.add('visible');
                // Dejar de observar el elemento para que la animación se ejecute solo una vez
                observador.unobserve(entrada.target);
            }
        });
    }, configuracionObservador);

    // Iniciar la observación de los elementos animables
    elementosAnimables.forEach(elemento => {
        observarScroll.observe(elemento);
    });

    // Lógica para el Modo Oscuro
    const botonTema = document.getElementById('botonTema');
    const htmlGlobal = document.documentElement;
    const iconoTema = botonTema.querySelector('svg');

    const iconoLuna = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    const iconoSol = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';

    // Comprobar la preferencia guardada o el esquema del sistema
    const temaGuardado = localStorage.getItem('temaGastio');
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (temaGuardado === 'dark' || (!temaGuardado && prefiereOscuro)) {
        htmlGlobal.setAttribute('data-theme', 'dark');
        iconoTema.innerHTML = iconoSol;
    }

    botonTema.addEventListener('click', () => {
        const temaActual = htmlGlobal.getAttribute('data-theme');
        if (temaActual === 'dark') {
            htmlGlobal.removeAttribute('data-theme');
            localStorage.setItem('temaGastio', 'light');
            iconoTema.innerHTML = iconoLuna;
        } else {
            htmlGlobal.setAttribute('data-theme', 'dark');
            localStorage.setItem('temaGastio', 'dark');
            iconoTema.innerHTML = iconoSol;
        }
    });

});
