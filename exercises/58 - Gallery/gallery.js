/* eslint-disable no-use-before-define */
function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }
  // select elements we need (img, modal, previous btn, next btn)
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prev = modal.querySelector('.prev');
  const next = modal.querySelector('.next');
  let currentImage;

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPreviousImage();
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }
    // update the modal with infos
    // console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    // console.log(currentImage);
    openModal();
  }

  function openModal() {
    // console.log('opening modal');
    // check if modal already open
    if (modal.matches('.open')) {
      return; // stop the function from running
    }
    modal.classList.add('open');
    // listeners to be bound when we open modal
    next.addEventListener('click', showNextImage);
    prev.addEventListener('click', showPreviousImage);
    window.addEventListener('keyup', handleKeyUp);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO : add listener for click outside and keyboard (esc key)
    next.removeEventListener('click', showNextImage);
    prev.removeEventListener('click', showPreviousImage);
    window.removeEventListener('keyup', handleKeyUp);
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPreviousImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // ! OUR LISTENER
  images.forEach(img => {
    img.addEventListener('click', event => showImage(event.currentTarget));
  });
  // loop over each image, attach listener to each image
  images.forEach(img => {
    img.addEventListener('keyup', event => {
      // when it's keyUp check if this is 'Enter" key
      if (event.key === 'Enter') {
        // if yes show image
        showImage(event.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
}

//  Use it on the page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
