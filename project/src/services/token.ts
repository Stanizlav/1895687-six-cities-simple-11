const AUTH_TOKEN_KEY = 'six-cities-token';

export const getToken = ():string => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';

export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN_KEY,token);

export const removeToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
