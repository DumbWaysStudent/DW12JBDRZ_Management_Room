import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://192.168.1.30:3000/api/v2',
  timeout: 10000,
});

export const setHeaderAuth = token => {
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
