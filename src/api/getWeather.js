import {baseUrl, apiKey} from './apiKeys.js';

const fetchData = async (endpoint, lat, lon) => {
  const url = new URL(`${baseUrl}/data/2.5/${endpoint}`);

  const queryParams = new URLSearchParams({
    lat: lat,
    lon: lon,
    appid: apiKey,
    lang: 'uk',
    units: 'metric',
  });

  url.search = queryParams.toString();

  const response = await fetch(url);

  if(!response) {
    throw new Error('Не вдалось отримати дані з серверу')
  }

  return response.json();
}

export const getWeather = async (lat, lon) => { 
  return fetchData('weather', lat, lon);
}

export const getForecast = async (lat, lon) => { 
  return fetchData('forecast', lat, lon);
}
