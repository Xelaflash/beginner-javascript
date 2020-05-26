const fromSelect = document.querySelector('[name="from_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toSelect = document.querySelector('[name="to_currency"]');
const toEl = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
const endpoint = 'https://api.exchangeratesapi.io/latest';
const ratesByBase = {};

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `
        <option value="${currencyCode}">${currencyCode} - ${currencyName}</option>
      `
    )
    .join('');
}

async function fetchRates(base = 'USD') {
  const response = await fetch(`${endpoint}?base=${base}`);
  const rates = await response.json();
  return rates;
}

async function convert(amount, fromCcy, toCcy) {
  // first check if we have the rates to convert from that ccy
  if (!ratesByBase[fromCcy]) {
    console.log(`we don't have the rate for this ${fromCcy}/${toCcy} ccy pair`);
    const rates = await fetchRates(fromCcy);
    // store it
    ratesByBase[fromCcy] = rates;
  }
  // convert the amount
  const rate = ratesByBase[fromCcy].rates[toCcy];
  const convertedAmount = rate * amount;
  return convertedAmount;
}

function formatCcy(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput() {
  const rawAmount = await convert(fromInput.value, fromSelect.value, toSelect.value);
  toEl.textContent = formatCcy(rawAmount, toSelect.value);
}

const optionsHtml = generateOptions(currencies);
fromSelect.innerHTML = optionsHtml;
toSelect.innerHTML = optionsHtml;

// you can listen for inputs on form, with bubbling listener will cover ALL inputs of that form
form.addEventListener('input', handleInput);
