# Weather Forecast

A web application for viewing current weather, hourly and daily forecasts for a selected city.

## Main Features

- Search weather by city (OpenWeatherMap API)
- Display current weather, hourly and daily forecast
- Show weather by user's geolocation (or default to Vinnytsia)
- Save the last entered city in local storage
- Light/Dark theme switch
- Scroll-to-top button
- Responsive design

## Project Structure

- `index.html` — main HTML page
- `main.js`, `init.js` — app initialization and logic
- `src/api/` — API logic (keys, geodata, weather)
- `src/components/` — UI components (form, errors, forecast, geolocation, etc.)
- `src/helpers/` — helper functions (city saving)
- `styles/` — styles for different app parts
- `public/` — icons and images

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/RomanOstrous/weather-forecast.git
   ```
2. Open `index.html` in your browser.

> You need your own OpenWeatherMap API key. Add it to `src/api/apiKeys.js`.

## Demo

[Open demo](https://romanostrous.github.io/weather-forecast/)

