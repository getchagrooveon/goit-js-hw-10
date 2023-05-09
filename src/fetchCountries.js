import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(input) {
  return fetch(`${BASE_URL}${input}`).then(responce => {
    if (responce.status === 404) {
      throw new Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    } else return responce.json();
  });
}



