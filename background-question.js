document.addEventListener("DOMContentLoaded", function () {
	let isBuilding = false;
    const negatives = ["Por favor, no acepto un no.",
		"Andaa, ¿Sí? Solo presiona el botón correcto, tú sabes cuál es.",
        "No nop, tú sabes bien donde pulsar cariño.",
        "Mmm, seguro que el botón correcto está esperando por ti.",
      	"No lo intentes cariño, tu sabes bien qué hacer.",
      	"Andaa, juntos es mejor."];
	const messages = [
        "El punto es que, en tí encontré\n"
      + "algo que en nadie pude encontrar,\n"
      + "algo que me hace completo.",
        /*"Summer, o Elvira, realmente hice\n"
      + "esto junto con la página web\n"
      + "anterior para tí, porque no\n"
      + "me gustaría que solo fueras\n"
      + "espectadora.",
        "Y mira, yo sé que tal vez la\n"
      + "diferencia de edad puede que te\n"
      + "resuene en tu mente.\n",
        "Aún así, quiero invitarte a algo.",
      	"No, más que eso, lo deseo y\n"
      + "y realmente lo quiero, así que sin más.."*/
    ];
    const back = document.getElementById('Back');
    const wrapper = document.getElementById('wrapper');
    const yesButton = document.getElementById('Yes');
    const noButton = document.getElementById('No');
    const nextButton = document.getElementById('Next');
	let currentMessageIndex = 0;
	
	yesButton.style.display = 'none';
	noButton.style.display = 'none';
	
	async function displayNextMessage() {
		if (currentMessageIndex < messages.length) {
			// Llama a `startBuilding` para mostrar el mensaje actual y espera a que termine
			await startBuilding(messages[currentMessageIndex]);
			currentMessageIndex++; // Avanza al siguiente mensaje
		} else {
			updateUI();
			await startBuilding("¿Puedo ser tu pareja/novio? y tú... mi amada novia.");
		}
	}
	
	async function updateUI() {
		// Aquí puedes hacer que el botón se oculte si ya no hay más mensajes
		nextButton.classList.add('fade-out');
		nextButton.style.display = 'none';
		// Mostrar botones "Sí" y "No" si están ocultos	
		yesButton.style.display = 'none'; // Inicialmente no se muestra
		noButton.style.display = 'none';
		yesButton.style.display = 'inline-block'; // Mostrar el botón "Sí"
		noButton.style.display = 'inline-block';  // Mostrar el botón "No"
		yesButton.classList.add('slide-in');
		noButton.classList.add('fade-in');
		back.classList.add('slide-in-left');
		// Forzar el reflow de los botones antes de aplicar la animación (esto es importante para que la animación se active)
		back.offsetHeight;
		yesButton.offsetHeight; // Leer una propiedad que fuerce el reflow
		 noButton.offsetHeight; // Leer una propiedad que fuerce el reflow
	}
	
	nextButton.addEventListener('click', displayNextMessage);
	
    // Función para generar corazones como una explosión
    yesButton.addEventListener('click', function () {
        for (let i = 0; i < 20; i++) { // Crear 20 corazones en cada clic
            const heart = document.createElement('div');
            heart.classList.add('heart-button');

            // Posicionar los corazones alrededor del botón, creando un efecto de explosión
            const angle = Math.random() * 2 * Math.PI; // Aleatorizar el ángulo
            const distance = Math.random() * 100 + 50; // Distancia aleatoria desde el botón

            const heartX = distance * Math.cos(angle);
            const heartY = distance * Math.sin(angle);

            heart.style.left = `${yesButton.offsetLeft + yesButton.offsetWidth / 2 + heartX - heart.offsetWidth / 2}px`; 
            heart.style.top = `${yesButton.offsetTop + yesButton.offsetHeight / 2 + heartY - heart.offsetHeight / 2}px`; 
            
            heart.style.animation = 'explode 1s ease-out forwards'; // Aplicar animación
            wrapper.appendChild(heart);

            // Eliminar el corazón después de que termine la animación
            setTimeout(() => {
                heart.remove();
            }, 1000); // Corazón desaparece después de 1 segundo
        }
		yesButton.classList.add('fade-out');
		noButton.classList.add('fade-out');
		yesButton.style.display = 'none';
		noButton.style.display = 'none';
		const botToken = '8020956978:AAGlaq1KtmCwgF-Ga8zcSB1ULhWYrBbfirc'; // Tu token de bot
		const chatId = '1557413244'; // Tu chat_id
		const message = 'Dijo que sí... FELICIDADES'; // El mensaje que quieres recibir
	
		// Enviar mensaje a Telegram usando la API de Telegram
		fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
			.then(response => {
				if (response.ok) {
					console.log('Mensaje enviado correctamente');
				} else {
					console.log('Error al enviar el mensaje');
				}
			})
			.catch(error => console.log('Error al enviar el mensaje:', error));
		messageYes();
    });
	
	async function messageYes() {
		await startBuilding("No sabes lo feliz que soy en este momento, gracias <3");
	}
	
	function startBuilding(message) {
		return new Promise((resolve) => {
			if (!isBuilding) {
				isBuilding = true;
				let currentString = "";
				let index = 0;
				const panel = document.getElementById('panel');
				const buildString = setInterval(() => {
					if (index < message.length) {
						currentString += message[index];
						panel.textContent = currentString;
						index++;
					} else {
						clearInterval(buildString);
						isBuilding = false;
						resolve(); // Cuando termine, resuelve la promesa.
					}
				}, 50); // Tiempo entre cada letra
			}
		});
	}
    
    async function changeText() {
        await startBuilding(negatives[Math.floor(Math.random() * negatives.length)]);
    }
    
    function redirect() {
        window.location.href = 'index.html';
    }

    // Función para mover el botón "No" aleatoriamente dentro del contenedor
    function moveButtonRandomly() {
        const wrapperWidth = wrapper.offsetWidth;
        const wrapperHeight = wrapper.offsetHeight;
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        // Generar posiciones aleatorias dentro de los límites del contenedor
        let newX = Math.random() * (wrapperWidth - buttonWidth);
        let newY = Math.random() * (wrapperHeight - buttonHeight);

        // Aplicar una transición más lenta y fluida al botón
        noButton.style.transition = 'transform 1s ease';
        noButton.style.transform = `translate(${newX - noButton.offsetLeft}px, ${newY - noButton.offsetTop}px)`;
		changeText();
    }

    // Mover el botón "No" aleatoriamente cuando el usuario se acerque
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Agregar el evento adecuado según el dispositivo
    if (isMobile) {
        noButton.addEventListener('touchstart', moveButtonRandomly); // Para dispositivos móviles
    } else {
        noButton.addEventListener('mouseover', moveButtonRandomly); // Para computadoras de escritorio
    }
    
    back.addEventListener('click', redirect);
});

// Función para generar corazones aleatorios
function generateHeart() {
    const wrapper = document.getElementById("wrapper");
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Tamaño aleatorio
    const size = Math.random() * (1 - 0.5) + 0.5;
    heart.style.transform = `scale(${size})`;

    // Posición aleatoria
    const leftPosition = Math.random() * 100;
    heart.style.left = `${leftPosition}%`;

    // Tiempo de animación aleatorio
    const animationDuration = Math.random() * (10 - 5) + 5;
    heart.style.animationDuration = `${animationDuration}s`;

    // Añadir el corazón al contenedor
    wrapper.appendChild(heart);

    // Eliminar el corazón después de que termine la animación
    setTimeout(() => {
        heart.remove();
    }, animationDuration * 1000);
}

// Generar corazones cada 500 ms
setInterval(generateHeart, 500);
