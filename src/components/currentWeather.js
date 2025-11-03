const currentCity = document.querySelector('.city');
const currentTemp = document.querySelector('.temperature');
const currentFeel = document.querySelector('.feels');
const currentDescription = document.querySelector('.description');
const currentIcon = document.querySelector('.weather-icon img');
const currentWind = document.querySelector(".wind");
const windText = document.getElementById("wind-direction-text");
const currentVisibility = document.querySelector(".visibility");
const currentHumidity = document.querySelector(".humidity");
const currentPressure = document.querySelector(".pressure");

export const renderCurrentWeather = (data, city) => {
  const nameCity = city || 'Невідомо';
  currentCity.textContent = nameCity.charAt(0).toUpperCase() + nameCity.slice(1);
  currentTemp.textContent = `${Math.round(data.main?.temp || 0)}°C`;
  currentFeel.textContent = `Відчувається як ${Math.round(data.main?.feels_like || 0)}°C`;
  const description = data.weather?.[0]?.description || 'невідомо';
  currentDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  currentIcon.src = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}.png` ||'01d';

  currentWind.textContent = `${Math.round(data.wind?.speed || 0)} м/с`;
  const visibility = data.visibility || 0;
  if (visibility > 1000) {
    currentVisibility.textContent = `${(visibility / 1000).toFixed(1)} км`;
  } else {
    currentVisibility.textContent = `${visibility} м`;
  }
  currentHumidity.textContent = `${data.main?.humidity || 0}%`;
  currentPressure.textContent = `${Math.round(
    (data.main?.pressure || 0) * 0.750062
  )} мм рт.ст.`;

  const windDeg = data.wind?.deg || 0;
  const directions = ["Пн", "ПнСх", "Сх", "ПдСх", "Пд", "ПдЗх", "Зх", "ПнЗх"];
  const normalizedDegrees = (windDeg + 360) % 360;
  const index = Math.round(normalizedDegrees / 45) % 8;
  windText.textContent = directions[index] || "Н/Д";

  const humidity = data.main?.humidity || 0;
  const parameter = document.querySelector(".parameter");

  parameter.style.width = `${humidity}%`;
};