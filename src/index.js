import './css/styles.css';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import {fetchURL} from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');


const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));



function onSearch(evt) {
  const name = evt.target.value.trim();
  if (name.length > 0) {
    fetchURL(name)
      .then(data => {
        if (data.length === 1) {
          return cardCountry(data);
        } else if (data.length > 10){
            countryList.style.display = 'none';
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        } else {
            return createMarkup(data);
        }
        
      })
      .catch(err => console.log(err));
  } else {
    countryInfo.style.display = 'none';
    countryList.style.display = 'none';
  }
}





function createMarkup(arr) {
  countryInfo.style.display = 'none';
  countryList.style.display = 'contents';
  const markupList = arr
    .map(
      ({ name: { common }, flags: { svg } }) => `<li class='country-item'>
    <img class='country-flags' src="${svg}">
    <h2 class='country-text'>${common}</h2>
  </li>`
    )
    .join('');

  return (countryList.innerHTML = markupList);
}

function cardCountry(arr) {
  countryList.style.display = 'none';
  countryInfo.style.display = 'contents';
  const markupOneCountry = arr
    .map(
      ({
        name: { official },
        capital,
        population,
        languages,
        flags: { svg },
      }) => `<li class='country-item'>
    <img class='country-flags' src="${svg}">
    <h2 class='country-text'>${official}</h2>
    <p class='text'>Capital: ${capital}</p>
    <p class='text'>Population: ${population}</p>
    <p class='text'>Languages: ${Object.values(languages).join('')}</p>
   
   </li>`
    )
    .join('');

  return (countryInfo.innerHTML = markupOneCountry);
}
