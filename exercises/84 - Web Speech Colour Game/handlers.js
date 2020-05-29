import { isvalidColor } from './colors';

function logWords(results) {
  console.log(results[results.length - 1][0].transcript);
}

export function handleResult({ results }) {
  logWords(results);
  const words = results[results.length - 1][0].transcript;
  console.log(words);
  // lowercase everything
  let color = words.toLowerCase();
  // strip any spaces
  color = color.replace(/\s/g, '');
  // check if it's a valid color
  if (!isvalidColor(color)) return;
  // if it is then show ui for that
  console.log(`${color} is a valid color`);
  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');
  // change Background
  document.body.style.backgroundColor = color;
}
