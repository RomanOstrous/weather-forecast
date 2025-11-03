export function saveCityToLocalStorage(city) {
  localStorage.setItem('cities', JSON.stringify(city));
};
