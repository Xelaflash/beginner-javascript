// Make a div
const div = document.createElement('div');

// add a class of wrapper to it
div.classList.add('wrapper');

// put it into the body
document.body.appendChild(div);

// make an unordered list
// add three list items with the words "one, two three" in them
// put that list into the above wrapper
const listHtml = `
  <ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
`;

div.insertAdjacentHTML('afterbegin', listHtml);

// create an image

// set the source to an image
// set the width to 250
// add a class of cute
// add an alt of Cute Puppy
// Append that image to the wrapper
const imgWidth = 250;
const src = `https://picsum.photos/${imgWidth}`;
const img = `<img  src="${src}" class="cute" alt="cute puppy" />  `;

div.insertAdjacentHTML('afterbegin', img);

// with HTML string, make a div, with two paragraphs inside of it
// put this div before the unordered list from above
// add a class to the second paragraph called warning
const htmlString = `
  <div>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aliquam fuga? Expedita.</p>
    <p class="warning">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil deleniti alias harum quod, ad distinctio. Obcaecati, facere soluta.</p>
  </div>
`;
const list = document.querySelector('ul');
list.insertAdjacentHTML('beforebegin', htmlString);

// remove the first paragraph
const paragraphToKill = document.querySelector('p');
paragraphToKill.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

function generatePlayerCard(name, age, height) {
  const playerCardHtml = `
    <div class="playerCard">
      <h2>${name} — ${age}</h2>
      <p>They are ${height} and ${age} years old. In Dog years this person would be ${age *
    7}. That would be a tall dog!</p>
    </div>
`;
  return playerCardHtml;
}

// make a new div with a class of cards

const cardDiv = document.createElement('div');
cardDiv.classList.add('cards');

// Have that function make 4 cards

let cardsHTML = generatePlayerCard('wes', 12, 150);
cardsHTML += generatePlayerCard('scott', 12, 150);
cardsHTML += generatePlayerCard('kait', 12, 150);
cardsHTML += generatePlayerCard('snickers', 12, 150);

const deleteBtn = `<i class="fas fa-trash"></i>`;

// append those cards to the div
// put the div into the DOM just before the wrapper element
cardDiv.innerHTML = cardsHTML;
div.insertAdjacentElement('beforebegin', cardDiv);

// Bonus, put a delete Button on each card so when you click it, the whole card is removed
const playerCards = document.querySelectorAll('.playerCard');
playerCards.forEach(card => card.insertAdjacentHTML('beforeend', deleteBtn));

// select all the buttons!
const btns = document.querySelectorAll('.fa-trash');

// make out delete function
const deleteCard = event => {
  const buttonThatGotClicked = event.currentTarget;
  buttonThatGotClicked.closest('.playerCard').remove();
};
// loop over them and attach a listener
btns.forEach(btn => {
  btn.addEventListener('click', deleteCard);
});
