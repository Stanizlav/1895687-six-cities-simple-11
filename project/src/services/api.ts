import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://11.react.pages.academy/six-cities-simple';
const REQUEST_TIMEOUT = 5000;
const HEADER_TOKEN = 'X-Token';

export const createAPI = ():AxiosInstance => {
  const api = axios.create({baseURL: BASE_URL, timeout: REQUEST_TIMEOUT});

  api.interceptors.request.use(
    (config: AxiosRequestConfig)=>{
      const token = getToken();
      if (token && config.headers){
        config.headers[HEADER_TOKEN] = token;
      }
      return config;
    }
  );

  return api;
};
