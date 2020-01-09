// const p = document.querySelectorAll('div .item');
// console.log(p);

// const heading = document.querySelector('h2');
// heading.textContent = "C'est moi qui ai fait ca";
// console.log(heading.textContent);
// return all element in the tag
// InnerText only the text.

// console.dir(heading);

// const pizzaList = document.querySelector('.pizza');
// console.log(pizzaList);
// // !! Pb is it renders the page again
// // pizzaList.textContent = `${pizzaList.textContent} 🍕`;
// // console.log(pizzaList.textContent);

// // !! Better way is to use insert
// pizzaList.insertAdjacentText('afterbegin', '🍕');
// pizzaList.insertAdjacentText('beforeend', '🍕');

// ?? classes
const img = document.querySelector('.nice');
// img.classList.toggle('round');
// console.log(img.classList);

function toggleRound() {
  img.classList.toggle('round');
}

img.addEventListener('click', toggleRound);

// ?? Data Attributes
img.alt = "c'est une image mon gars"; // Setter
console.log(img.alt); // Getter
console.log(img.naturalWidth); // will return 0 if run from here, but the actual size if run in console. ==> Need to be loaded

img.addEventListener('load', function() {
  console.log(img.naturalWidth);
});

// !! DO NOT CREATE CUSTOM ATTRIBUTE
img.setAttribute('alt', "i've set the alt attribute via js!");
console.log(img.getAttribute('alt'));
