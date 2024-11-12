const container = document.body;
let hearts = [];
const maxHearts = 5;
// Evento para mover los corazones con el mouse
document.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;
  followMouse(x, y);
});

// Evento para explotar los corazones al hacer clic
document.addEventListener('click', (e) => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  explodeHearts(e.clientX + scrollX, e.clientY + scrollY);
});

// Función para hacer que los corazones sigan el mouse
function followMouse(x, y) {
  // Obtener desplazamiento de la página
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  if (hearts.length < maxHearts) {
    const heart = createHeart(x + scrollX, y + scrollY);
    hearts.push(heart);
    container.appendChild(heart);
  }

  hearts.forEach((heart, index) => {
    setTimeout(() => {
      heart.style.left = `${x + scrollX}px`;
      heart.style.top = `${y + scrollY}px`;
    }, index * 100);
  });
}

// Función para crear un corazón seguidor
function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.classList.add('heart-follow');
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  return heart;
}

// Función para hacer explotar los corazones
function explodeHearts(x, y) {
  hearts.forEach((heart) => {
    container.removeChild(heart);
    createExplosion(x, y);
  });
  hearts = [];
}

// Crear explosión de mini-corazones
function createExplosion(x, y) {
  const numFragments = 10;
  for (let i = 0; i < numFragments; i++) {
    const fragment = document.createElement('div');
    fragment.classList.add('heart-follow', 'heart-explode');
    fragment.style.left = `${x}px`;
    fragment.style.top = `${y}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    fragment.style.setProperty('--x', `${offsetX}px`);
    fragment.style.setProperty('--y', `${offsetY}px`);

    container.appendChild(fragment);
    fragment.addEventListener('animationend', () => {
      fragment.remove();
    });
  }
}
