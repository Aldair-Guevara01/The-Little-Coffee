document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.fa-bars');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        // Cambia la visibilidad del menú
        if (menu.style.display === 'flex') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'flex';
        }
    });
});

// Función para mostrar u ocultar más información al hacer clic en "Leer más"
function toggleMoreInfo(id) {
    const element = document.getElementById(id);
    // Alterna entre mostrar y ocultar el contenido
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";  // Mostrar el contenido
    } else {
        element.style.display = "none";  // Ocultar el contenido
    }
}

// Función para mostrar u ocultar más información al hacer clic en "Leer más" o "X"
function toggleMoreInfo(id) {
    const element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";  // Mostrar el contenido
    } else {
        element.style.display = "none";  // Ocultar el contenido
    }
}








