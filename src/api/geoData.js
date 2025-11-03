import {baseUrl, apiKey} from './apiKeys.js';
import { cityInput} from '../components/inputForm.js';
import { showErrorMessage } from '../components/error.js';
import { saveCityToLocalStorage } from '../helpers/saveCityToLocalStorge.js';
import { getWeather } from './getWeather.js';
import { renderCurrentWeather } from '../components/currentWeather.js';

export const getGeodata = async () => {
  const city = cityInput.value.trim();
  showErrorMessage('');

  if (!city) {
    return;
  } 

  city.toLowerCase();

  try {
    const geoUrl = `${baseUrl}/geo/1.0/direct`;
    const queryParams = new URLSearchParams({
      q: city,
      limit: 1,
      appid: apiKey,
    });

    const geoResponse = await fetch(`${geoUrl}?${queryParams.toString()}`);
    const geoData = await geoResponse.json();

    if(!geoData.length) {
      throw new Error('Населений пункт не знайдено');
    };

    const {lat, lon} = geoData[0];
    saveCityToLocalStorage(city);

    const weatherData = await getWeather(lat, lon);
    /* const forecastData = await getForecast(lat, lon); */

    renderCurrentWeather(weatherData, city);
/*     renderForecast(forecastData); */

  } catch(error) {
    showErrorMessage('Дані не отримані');
    console.error(error.message);
  }
}
