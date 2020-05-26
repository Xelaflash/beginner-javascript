const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = `https://cors-anywhere.herokuapp.com`;
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecipes(query) {
  const response = await fetch(`${proxy}/${baseEndpoint}?q=${query}`);
  const data = await response.json();
  return data;
}

function displayRecipes(recipes) {
  const html = recipes.map(
    recipe => `
  <div class="recipe">
  <h2>${recipe.title}</h2>
  <p>${recipe.ingredients}</p>
  ${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
  <a href="${recipe.href}">View recipe → </a>
  </div>
  `
  );
  recipesGrid.innerHTML = html.join('');
}

async function fetchAndDisplay(query) {
  // turn the form off
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(query);
  console.log(recipes);
  form.submit.disabled = false;
  displayRecipes(recipes.results);
}

async function handleSubmit(event) {
  event.preventDefault();
  fetchAndDisplay(form.query.value);
}

form.addEventListener('submit', handleSubmit);
// run on page load
fetchAndDisplay('pizza');
