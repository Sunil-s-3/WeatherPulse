import axios from 'axios';

const API_KEY = "ba1bd592ecdf3af8a8f273bd71fd4607";
const BASE_URL = "https://api.weatherstack.com";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
  timeout: 10000,
});

export const getCurrentWeather = async (query) => {
  const { data } = await api.get('/current', {
    params: { query },
  });
  return data;
};

export const getHistoricalWeather = async (query, historicalDate) => {
  const { data } = await api.get('/historical', {
    params: {
      query,
      historical_date: historicalDate,
    },
  });
  return data;
};

export const getMarineWeather = async (lat, lon) => {
  const query = `${lat},${lon}`;
  const { data } = await api.get('/marine', {
    params: { query },
  });
  return data;
};

export default api;
