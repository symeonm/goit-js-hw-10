const fetchURL = function fetchCountries(nameCountry) {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    

    const URL = `${BASE_URL}${nameCountry}?fields=name,capital,population,flags,languages`;
    return fetch(URL).then(resp => {
      if (!resp.ok) {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      } 
      return resp.json();
    });
  }

export {fetchURL};