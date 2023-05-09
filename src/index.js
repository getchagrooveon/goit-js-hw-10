import Notiflix from 'notiflix';
import './css/styles.css';
import { debounce, forIn } from 'lodash';
const DEBOUNCE_DELAY = 300;
import { fetchCountries } from '/src/fetchCountries';
const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputField.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  const input = event.target.value.trim();
  if (input.length === 0) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  } else {
    fetchCountries(input)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countryList.innerHTML = '';
        } else if (data.length <= 10 && data.length >= 2) {
          createMarkup(data);
        } else if (data.length === 1) {
          createFullMarkup(data);
        }
      })
      .catch(error => console.log('404 error'));
  }
}

function createMarkup(data) {
  const structure = [];
  data.map(element =>
    structure.push(
      `<li><img src="${element.flags.svg}" alt="${element.flags.alt}" width="76"  height='40'/>${element.name.official}</li>`
    )
  );
  countryList.innerHTML = structure.join('');
  countryInfo.innerHTML = '';
}

function createFullMarkup(data) {
  const structure = [];
  data.map(element =>
    structure.push(
      `<li><img src="${element.flags.svg}" alt="${
        element.flags.alt
      }" width="76"  height='40'/>${element.name.official}</li>
    <li>Capital: ${element.capital}</li><li>Population: ${
        element.population
      }</li><li>Language: ${Object.values(element.languages).join(', ')}</li>`
    )
  );
  countryList.innerHTML = '';
  countryInfo.innerHTML = structure.join('');
}
