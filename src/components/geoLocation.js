import { apiKey, baseUrl } from "../api/apiKeys.js";
import { showErrorMessage } from "./error.js";
import { getForecast, getWeather } from "../api/getWeather.js";
import { renderCurrentWeather } from "./currentWeather.js";
import { renderHourlyForecast } from "./hourlyForecast.js";
import { renderDailyForecast } from "./dailyFotecast.js";



export function geoLocation() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const { latitude, longitude } = await getBrowserGeolocation();
      const locationName = await geoLocationName(latitude, longitude);
      await fetchWeatherByCoords(latitude, longitude, locationName);
    } catch (error) {
      console.error("Помилка при отриманні геолокації: ", error.message);

      const defaultLat = 49.2328;// корд Вінниці
      const defaultLon = 28.48097;
      const locationName = await geoLocationName(defaultLat, defaultLon);
      await fetchWeatherByCoords(defaultLat, defaultLon, locationName);
      showErrorMessage(
        "Не вдалося визначити ваше місцезнаходження. Включіть геолокацію або введіть населений пункт в ручну."
      );
    }
  });
}

const getBrowserGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокація не підтримується вашим браузером"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

const geoLocationName = async (latitude, longitude) => {
  const reverseGeocodingUrl = new URL(`${baseUrl}/geo/1.0/reverse`);

  const queryParams = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    limit: 1,
    appid: apiKey,
  });

  const url = `${reverseGeocodingUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const { local_names } = data[0];
      const ukrainianName = local_names?.uk || data[0].name;
      return `${ukrainianName}`;
    } else {
      throw new Error("Назву місця не знайдено");
    }
  } catch (error) {
    console.error("Помилка при отриманні назви місця: ", error.message);
    showErrorMessage("Помилка при отриманні назви місця");
  }
};

const fetchWeatherByCoords = async (latitude, longitude, locationName) => {
  try {
    const weatherData = await getWeather(latitude, longitude);
    const forecastData = await getForecast(latitude, longitude);

    renderCurrentWeather(weatherData, locationName);
    renderHourlyForecast(forecastData);
    renderDailyForecast(forecastData);
  } catch (error) {
    console.error(error.message);
    showErrorMessage(
      "Не вдалося отримати дані про погоду. Будь ласка, спробуйте пізніше."
    );
  }
};
