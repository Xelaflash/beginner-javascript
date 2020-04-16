/* eslint-disable no-use-before-define */
const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const faceDetector = new window.FaceDetector({ fastMode: true });
// console.log(video, canvas, faceCanvas, faceDetector);
const optionsInputs = document.querySelectorAll('.controls input[type="range"]');

const options = {
  SIZE: 10,
  SCALE: 1.35,
};

function handleOption(event) {
  const { value, name } = event.currentTarget;
  options[name] = parseFloat(value);
}
optionsInputs.forEach(input => input.addEventListener('input', handleOption));

// Write a fucntion that will populate the users video
async function populateVideo() {
  // grab the feed of user webcam
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1080, height: 624 },
  });
  // setting the vid object on the html to the user webcam stream
  video.srcObject = stream;
  await video.play();

  // size the canvases to be same size as video stream
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  // ask the browser when the next animation frame is and tell it to run detect for us
  // console.log(faces.length);
  faces.forEach(drawFace);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#ffc600';
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // draw the small face
  faceCtx.drawImage(
    // 5 source args
    video, // where does the source come from?
    face.x, // where do we start the source pull from?
    face.y,
    face.width,
    face.height,
    // 4 draw args
    face.x, // where should we start drawing the x and y?
    face.y,
    options.SIZE,
    options.SIZE
  );

  // draw the small face back on, but scale up
  const width = face.width * options.SCALE;
  const height = face.height * options.SCALE;
  faceCtx.drawImage(
    faceCanvas, // source
    face.x, // where do we start the source pull from?
    face.y,
    options.SIZE,
    options.SIZE,
    // Drawing args
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}
populateVideo().then(detect);
