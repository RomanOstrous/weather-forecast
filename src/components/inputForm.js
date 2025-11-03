import { getGeodata } from "../api/geoData.js";

const searchForm = document.querySelector('.search-form');
export const cityInput = document.querySelector('.city-input');
const listCity = document.getElementById('recent-cities-list');

export function getWeatherByForm() {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    getGeodata(cityInput);
    listCity.style.display = 'none';
  });

  cityInput.addEventListener('focus', () => {
    showRecentCity();
  });

  document.addEventListener('click', (e) => {
    if(e.target !== cityInput && e.target !== listCity) {
      listCity.style.display = 'none';
    }
  });
}

function showRecentCity() {
  const city = JSON.parse(localStorage.getItem('cities'));
  if(city.length === 0) return;
  listCity.innerHTML = '';
  const li = document.createElement('li');
  li.textContent = city;
  li.addEventListener('click', () => {
    cityInput.value = city;
    listCity.style.display = 'none';
  });
  listCity.append(li);
  listCity.style.display = 'block';
}
