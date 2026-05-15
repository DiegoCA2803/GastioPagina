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

});
