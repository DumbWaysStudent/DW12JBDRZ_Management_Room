import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://cohype.herokuapp.com/api/v2',
  timeout: 10000,
});

export const setHeaderAuth = token => {
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
