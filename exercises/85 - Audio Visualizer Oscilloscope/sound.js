import { hslToRgb } from './utils';

const WIDTH = 1500;
const HEIGHT = 1500;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let analyzer;
let bufferLength;

function handleError(err) {
  console.log('please give permission to the mic');
}

async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(handleError);
  // console.log(stream);
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
  // audio data we wan to collect
  analyzer.fftSize = 2 ** 9;
  // how many pieces of data are there
  bufferLength = analyzer.frequencyBinCount;
  // pull data from audio
  const timeData = new Uint8Array(bufferLength);
  // console.log(timeData);
  const frequencyData = new Uint8Array(bufferLength);
  // console.log(frequencyData);
  drawTimeData(timeData);
  drawFrequency(frequencyData);
}

// draw frequency bars

// draw time waves
function drawTimeData(timeData) {
  // inject time date into array
  analyzer.getByteTimeDomainData(timeData);
  // draw visual
  // 1. clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // 2. set up canvas drawing
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#ffc600';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  // console.log(sliceWidth);
  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;
    // draw lines
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  });
  ctx.stroke();
  // call itself asap
  requestAnimationFrame(() => drawTimeData(timeData));
}

function drawFrequency(frequencyData) {
  // get frequency data into array
  analyzer.getByteFrequencyData(frequencyData);
  // figure out the bar width
  const barWidth = (WIDTH / bufferLength) * 2.5;
  console.log(barWidth);
  let x = 0;
  frequencyData.forEach(amount => {
    // range from 0 to 255
    const percent = amount / 255;
    const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const barHeight = HEIGHT * percent * 0.5;
    // convert color to hsl
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 2;
  });
  // call itself asap
  requestAnimationFrame(() => drawFrequency(frequencyData));
}

getAudio();
