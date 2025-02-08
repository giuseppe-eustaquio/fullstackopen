import axios from 'axios';

const api_key = import.meta.env.VITE_SOME_KEY;
const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=`;

const getAll = (capital) => {
  const request = axios.get(baseURL.concat(capital));
  return request.then((response) => response.data);
};

export default { getAll };
