// select elements canvas, and btn
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 30;
//  set up canvas for drawing (make the line look round)
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

// rainbow style stroke ==> cause it's cool
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// sets the starting point by putting a dot at a random canvas position
// make it random width and height and generates random nbr between 0 and width/height values
const { width, height } = canvas; // destructuring syntax

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y); // starting point (x, y)
ctx.lineTo(x, y);
ctx.stroke();

// write draw function (with destructuring syntax)
function draw({ key }) {
  // increment hue value
  hue += 5;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(x, y);
  // move our x and why following user key stroke
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// write handler for keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// clear canvas function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true } // this third arguments permit remove the listener at end of animation
  );
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
