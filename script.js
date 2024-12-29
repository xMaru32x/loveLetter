document.querySelector('.heart').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'CartaParaLeslie.pdf', true);// Asegurate que sea el mismo nombre de tu carta, al nombre escrito en esta linea.
    xhr.responseType = 'blob'; 
    xhr.onload = function() {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'CartaParaLeslie.pdf';// Nombre con el que se descarga la carta
        link.click();
        window.URL.revokeObjectURL(link.href);
      } else {
        console.error('No se pudo descargar el archivo.');
      }
    };
    xhr.send();
  });

  var savedCountdown = localStorage.getItem('countDownDate');
  var countDownMinutes = 48; // Define el tiempo en horas para la cuenta regresiva
  var countDownDate;
  
  if (!savedCountdown) {
    countDownDate = new Date().getTime() + (countDownMinutes * 60 * 60 * 1000);
    localStorage.setItem('countDownDate', countDownDate.toString());
  } else {
    countDownDate = parseInt(savedCountdown, 10);
  }
  
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
  
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("countdown").textContent = `Nueva carta en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  
    localStorage.setItem('countDownDate', countDownDate.toString());
    //localStorage.clear();
    if (distance < 0) {
      clearInterval(x); // Detiene el temporizador
      document.getElementById("countdown").textContent = "¡Nueva carta disponible!";
      //localStorage.removeItem('countDownDate'); // Limpia el almacenamiento si el tiempo ha expirado
    }
  }, 1000);

