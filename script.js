document.querySelector('.heart').addEventListener('click', async function() {
    const targetDate = new Date('2025-01-03T12:00:00').getTime();
    const currentDate = Date.now();

    if (currentDate < targetDate) {
        const modalContainer = document.getElementById('modal_container');
        modalContainer.classList.add('show'); 
        return;
    }

    try {
        const response = await fetch('CartaParaLeslie.pdf'); 

        if (!response.ok) { 
            if (response.status === 404) {
                console.error('Archivo no encontrado:', response.statusText);
                alert("El archivo solicitado no se encuentra disponible. Por favor, inténtelo más tarde.");
            } else {
                console.error('Error al descargar el archivo:', response.status, response.statusText);
                alert("Error al descargar el archivo. Por favor, inténtelo de nuevo más tarde.");
            }
            return; 
        }

        const blob = await response.blob(); 
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'CartaParaLeslie.pdf';
        link.click();
        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Error de red al descargar el archivo:', error);
        alert("Error de red. Por favor, compruebe su conexión a internet.");
    }
});

function updateCountdown() {
    let countDownDate = new Date('2025-01-03T12:00:00').getTime();
    const now = Date.now();
    const distance = countDownDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").textContent = "¡Nueva carta disponible!";
        localStorage.removeItem('countDownDate');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").textContent = `Nueva carta en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    localStorage.setItem('countDownDate', countDownDate);
}

updateCountdown();
let countdownInterval = setInterval(updateCountdown, 1000);

const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});

window.onclick = function(event) {
    if (event.target == modal_container) {
        modal_container.classList.remove('show');
    }
};
