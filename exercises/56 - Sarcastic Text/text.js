const inputs = Array.from(document.querySelectorAll('input[name="filter"]'));
const textarea = document.querySelector('textarea[name="text"]');
const result = document.querySelector('.result');
// console.log(inputs, textarea, result);

/* eslint-disable */
const funkyLetters = {
  '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
};
/* eslint-enable */

const filters = {
  sarcastic(letter, index) {
    //  if odd, modulo will return 1 => we uppercase
    if (index % 2) {
      return letter.toUpperCase();
    }
    //  if even, modulo will return 0 => we lowercase
    return letter.toLowerCase();
  },
  funky(letter) {
    // check if there is a funky letter for this case
    let funkyLetter = funkyLetters[letter];
    if (funkyLetter) return funkyLetter;
    // if not check if there is a lower case version
    funkyLetter = funkyLetters[letter.toLowerCase()];
    if (funkyLetter) return funkyLetter;
    // if nothing return the letter
    return letter;
  },
  unable(letter) {
    // put ... randomly in a space
    const random = Math.floor(Math.random() * 3);
    if (letter === ' ' && random === 2) {
      return '...';
    }
    return letter;
  },
};

function transformText(text) {
  // Grab the filter
  // this solution is running query selector on each input ==> not very good performance wise
  // const filter = document.querySelector('[name="filter"]:checked').value;
  // Solution 2
  const filter = inputs.find(input => input.checked).value;

  // take the text
  const mod = Array.from(text).map(filters[filter]);
  // console.log(mod);
  // and loop over each letter =< uppercase every other letter
  result.textContent = mod.join('');
}

textarea.addEventListener('input', e => transformText(e.target.value));

inputs.forEach(input => {
  input.addEventListener('input', () => {
    transformText(textarea.value);
  });
});
