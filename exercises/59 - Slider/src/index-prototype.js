function Slider(sliderEl) {
  if (!(sliderEl instanceof Element)) {
    throw new Error('no slider passed in');
  }

  // Argument sliderEl needs to be saved on the instance because we use a query selector on it after
  this.sliderEl = sliderEl;
  this.slides = sliderEl.querySelector('.slides');

  // these can be kept has variables because we don't need them outside of the constructor
  const prevBtn = sliderEl.querySelector('.goToPrev');
  const nextBtn = sliderEl.querySelector('.goToNext');

  this.startSlider();
  this.applyClasses();

  prevBtn.addEventListener('click', () => this.move('back'));
  nextBtn.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function() {
  this.current = this.sliderEl.querySelector('.current') || this.slides.firstElementChild;
  this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
};

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.next.classList.add('next');
  this.prev.classList.add('prev');
};

Slider.prototype.move = function(direction) {
  const classesToRemove = ['prev', 'current', 'next'];
  this.prev.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);
  if (direction === 'back') {
    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

window.dogSlider = dogSlider;

window.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowRight') {
    dogSlider.move();
  }
  if (event.key === 'ArrowLeft') {
    dogSlider.move('back');
  }
});
