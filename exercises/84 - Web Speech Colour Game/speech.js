import { handleResult } from './handlers';
import { colorsByLength, isDark } from './colors';

const colorEl = document.querySelector('.colors');

function displayColors(colors) {
  return colors
    .map(
      color => `<span class="color ${color} ${isDark(color) ? 'dark' : ''}" style="background:${color}">${color}</span>`
    )
    .join('');
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function start() {
  // see if browser is compatible
  if (!('SpeechRecognition' in window)) {
    console.log('features not supported by the browser');
    return;
  }
  // supported
  console.log('starting app...');
  // Make a new speech reco
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

start();
colorEl.innerHTML = displayColors(colorsByLength);
