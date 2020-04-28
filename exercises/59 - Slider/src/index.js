function Slider(sliderEl) {
  if (!(sliderEl instanceof Element)) {
    throw new Error('no slider passed in');
  }
  // create var to works with slider
  let prev;
  let current;
  let next;

  // select elements needed for slider (all slides and prv/next btns)
  const slides = sliderEl.querySelector('.slides');
  // console.log(slides);
  const prevBtn = sliderEl.querySelector('.goToPrev');
  const nextBtn = sliderEl.querySelector('.goToNext');

  function startSlider() {
    current = sliderEl.querySelector('.current') || slides.firstElementChild;
    // console.log(current);
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    // console.log({ current, prev, next });
  }

  function applyClasses() {
    current.classList.add('current');
    next.classList.add('next');
    prev.classList.add('prev');
  }

  function move(direction) {
    // first strip all classes of current slide
    const classesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    if (direction === 'back') {
      // make a new array of the new values and we destructure them over into next, current prev variables
      [prev, current, next] = [prev.previousElementSibling || slides.lastElementChild, prev, current];
    } else {
      [prev, current, next] = [current, next, next.nextElementSibling || slides.firstElementChild];
    }
    applyClasses();
  }

  // When slider is created run start slider function (==> constructor)
  startSlider();
  applyClasses();

  // listener
  prevBtn.addEventListener('click', () => move('back'));
  nextBtn.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
