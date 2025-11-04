import { switchTheme } from "./src/components/swithTheme.js";
import { getGeodata } from "./src/api/geoData.js";
import { getWeatherByForm } from "./src/components/inputForm.js";
import { renderCurrentTime } from "./src/helpers/currentTime.js";
import { scrollToTop } from "./src/components/scrollToTop.js";
import { geoLocation } from "./src/components/geoLocation.js";

export function initApp() {
  switchTheme();
  getGeodata();
  getWeatherByForm();
  renderCurrentTime();
  scrollToTop();
  geoLocation();
};
