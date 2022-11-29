const AUTH_TOKEN_KEY = 'six-cities-token';

export type Token = string;

export const getToken = ():Token => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';

export const setToken = (token: Token) => localStorage.setItem(AUTH_TOKEN_KEY,token);

export const removeToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
