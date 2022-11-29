import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://11.react.pages.academy/six-cities-simple';
const REQUEST_TIMEOUT = 5000;

export const createAPI = ():AxiosInstance => axios.create({baseURL: BASE_URL, timeout: REQUEST_TIMEOUT});
