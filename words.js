// Array de frases de la carta
const letterLines = [
  "Para: Elvira/Summer",
  "Bueno, esto puede ser un",
  "poco largo, pero la",
  "verdad... yo no sabía que",
  "esto iba a terminar así, y",
  "tampoco me quejo de ello si",
  "te soy sincero, al contrario,",
  "me encanta y sólo quisiera",
  "que no acabe.",
  "Conforme te voy conociendo,",
  "me vas gustando cada vez",
  "más y más, y si te soy",
  "completamente sincero,",
  "llegué a este punto de",
  "verdaderamente querer algo",
  "contigo. Cariño, esta carta",
  "la hago con total cariño",
  "para tí, también poniendo",
  "bastante empeño con los",
  "conocimientos que tengo,",
  "realmente tú y sólo tú te",
  "mereces esto y más. Y la",
  "verdad, si piensas que me",
  "causas algún tipo de",
  "molestía por contarme tus",
  "cosas, te haré saber que no",
  "es así, lo único que quiero",
  "es apoyarte y escucharte",
  "durante todo el tiempo que",
  "esté contigo. Así que...",
  "ahora sí, puedes dar click",
  "en el botón de avanzar",
  "mi vida <3. (Y algún día",
  "en serio, quiero ir aquí contigo)"
];

// Seleccionar el contenedor de la carta
const letterContainer = document.querySelector('.letter');

// Crear y agregar cada línea de la carta al contenedor
letterLines.forEach((lineText, index) => {
  const line = document.createElement('div');
  line.classList.add('words', `line${index + 1}`);
  line.textContent = lineText;
  letterContainer.appendChild(line);
});
