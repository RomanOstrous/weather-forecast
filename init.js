import { switchTheme } from "./src/components/swithTheme.js";
import { getGeodata } from "./src/api/geoData.js";
import { getWeatherByForm } from "./src/components/inputForm.js";

export function initApp() {
  switchTheme();
  getGeodata();
  getWeatherByForm();
};