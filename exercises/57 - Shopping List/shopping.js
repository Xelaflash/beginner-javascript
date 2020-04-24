const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// we need an array to hold our state
let items = [];

// listen for submit event
function handleSubmit(event) {
  event.preventDefault();
  // console.log("submited");
  // input can be accessed into with name attribute
  const name = event.currentTarget.item.value;
  // console.log(event.currentTarget.item);
  const item = {
    name,
    // to have a unique id
    id: Date.now(),
    complete: false,
  };
  items.push(item);
  // console.log(`${items.length} in your state`);
  // clear the form
  event.target.reset();
  // displayItems(); // ok to put this here, but there is better => check refacto below and new listener l45
  //  fire off custom event that will tell items has been updated ==> needs to be listened to do something
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  // console.log(items);
  const html = items
    .map(
      item => `<li class="shopping-item">
      <input type="checkbox" value="${item.id}" ${item.complete ? 'checked' : ''} >
      <span class="itemName">${item.name}</span>
      <button value="${item.id}" aria-label="Remove ${item.name}">&times;</button>
  </li>`
    )
    .join('');
  // console.log(html);
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  // console.log('saving item to localstorage');
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  // pull items from storage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // spreading argument into items array
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log(`deleting item ${id}`);
  // update items array
  items = items.filter(item => item.id !== id);
  // console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  // console.log(`complete ${id}`);
  const itemRef = items.find(item => item.id === id);
  // we are setting as the opposite for toggling true false
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event delegation we listen for click on the LIST UL but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', event => {
  // we listen on the list but actually it's the btn
  // console.log(event.target); // thing actually clicked on
  // console.log(event.currentTarget); // thing we listen for the event on
  const id = parseInt(event.target.value);
  if (event.target.matches('button')) {
    deleteItem(id);
  }
  if (event.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

// run on page load
restoreFromLocalStorage();
